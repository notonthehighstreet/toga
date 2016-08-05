var express = require('express');
var one = require('./routes/one-component');
var multiple = require('./routes/multiple-components');
var nested = require('./routes/nested-components');
var multipleNested = require('./routes/multiple-nested-components');
var locale = require('./routes/locale-component');
var communication = require('./routes/communication-component');

const server = express();

server.get('/one', one);
server.get('/multiple', multiple);
server.get('/multiple-nested', multipleNested);
server.get('/nested', nested);
server.get('/locale', locale);
server.get('/communication', communication);

server.listen('3000', () => {
    console.log(`Running on port 3000' :`); //eslint-disable-line
});
