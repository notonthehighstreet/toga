var express = require('express');
var one = require('./routes/one-component');
var multiple = require('./routes/multiple-components');
var multipleNested = require('./routes/multiple-nested-components');

const server = express();

server.get('/one', one);
server.get('/multiple', multiple);
server.get('/multiple-nested', multipleNested);

server.listen(process.env.port || '3000', () => {
    console.log('Running:'); //eslint-disable-line
});
