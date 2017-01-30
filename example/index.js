require('babel-core/register');
var express = require('express');
var one = require('./routes/one-component');
var redux = require('./routes/redux-component');
var multiple = require('./routes/multiple-components');
var nested = require('./routes/nested-components');
var multipleNested = require('./routes/multiple-nested-components');
var communication = require('./routes/communication-component');
var bootstrapApp = require('../src/index');

const server = express();
const host = 'localhost';
const port = process.env.TOGA_SERVER_PORT || 3001;
const breadboardConfig = { port, host };

server.get('/redux', redux);
server.get('/one', one);
server.get('/multiple', multiple);
server.get('/multiple-nested', multipleNested);
server.get('/nested', nested);
server.get('/communication', communication);

const { getHtml } = require('./utils');

server.get('/static', function staticServer(req, res) {
  const bundles = require('../dist/components/asset-bundles.json');
  const vendorBundle = bundles.vendor;
  const componentName = 'test-multiple';
  const bundle = bundles[componentName];

  getHtml([`http:${bundle.html.replace('3001', '3000')}`])
    .then((componentDOM)=>{
      res.send(`<!DOCTYPE html>
        <html dir="ltr" lang="en">
        <head>
          <meta charset="UTF-8">
          <script>
            var dm = document.documentMode;
            document.documentElement.className += dm ? ' oldie ie' + dm : '';
          </script>
          <title>Toga Test - Static</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          ${ vendorBundle && vendorBundle.css ? `<link rel="stylesheet" type="text/css" href='${vendorBundle.css}'>` : '' }
          <link rel="stylesheet" type="text/css" href='${bundle.css}'>
          </head>
          <body>
          ${componentDOM}
          ${ vendorBundle ? `<script src='${vendorBundle.js}'></script>` : '' }
          <script src='${bundle.js}'></script>
        </body>
        </html>
      `);
    })
    .catch(e => {
      throw Error(e);
    });
});
server.use('/', express.static('dist/components'));

module.exports = Promise.resolve()
  .then(() => bootstrapApp(breadboardConfig))
  .then(({deps: {'/logger': getLogger}, entryResolveValue: togaServer}) => {
    const logger = getLogger();

    logger.info('TogaServer listening at http://%s:%s', host, port);

    return togaServer;
  })
  .then((togaServer) => {
    return new Promise((resolve)=> {
      return server.listen('3000', () => {
        console.log(`ExampleServer on port 3000' :`); //eslint-disable-line
        resolve({ exampleServer: server, togaServer });
      });
    });
  })
  .catch((e) => {
    process.stderr.write(e.stack);
    process.exit(1);
  });

