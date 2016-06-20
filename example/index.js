var express = require('express');
var one = require('./routes/one-component');
var multiple = require('./routes/multiple-components');
var nested = require('./routes/nested-components');
var multipleNested = require('./routes/multiple-nested-components');
var locale = require('./routes/locale-component');

const server = express();

server.get('/one', one);
server.get('/multiple', multiple);
server.get('/multiple-nested', multipleNested);
server.get('/nested', nested);
server.get('/locale', locale);

server.listen(process.env.port || '3000', () => {
    console.log('Running:'); //eslint-disable-line
});
