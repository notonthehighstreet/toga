var express = require('express');
var routes = require('./routes');

const server = express();

server
  .get(['/', '/one'], routes.one)
  .get('/multiple', routes.multiple)
  .listen(process.env.port || '3000', () => {
    console.log('Running:'); //eslint-disable-line
  });
