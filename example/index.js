require('babel-core/register');
var express = require('express');
var one = require('./routes/one-component');
var multiple = require('./routes/multiple-components');
var nested = require('./routes/nested-components');
var multipleNested = require('./routes/multiple-nested-components');
var communication = require('./routes/communication-component');

var bootstrapApp = require('../index');
const server = express();

server.get('/one', one);
server.get('/multiple', multiple);
server.get('/multiple-nested', multipleNested);
server.get('/nested', nested);
server.get('/communication', communication);

module.exports = bootstrapApp({
  port: 3001,
  host: 'localhost'
})
  .then(({deps: {'/logger': getLogger}, entryResolveValue: togaServer}) => {
    const host = togaServer.address().address;
    const port = togaServer.address().port;
    const logger = getLogger();

    logger.info('TogaServer listening at http://%s:%s', host, port);

    return togaServer;
  })
  .then(() => {
    return new Promise((resolve)=> {
      return server.listen('3000', () => {
        console.log(`ExampleServer on port 3000' :`); //eslint-disable-line
        resolve(server);
      });
    });
  })
  .catch((e) => {
    process.stderr.write(e.stack);
    process.exit(1);
  });

