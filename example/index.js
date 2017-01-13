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

module.exports = Promise.resolve()
  .then(() => require('../src/script/generateBundles'))
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

