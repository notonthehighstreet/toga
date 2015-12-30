'use strict';

var express = require('express');
var app = express();

var i18n = require('i18n');
app.use(i18n.middleware);

var routes = require('./app/routes')(app);

app.set('views', './public');

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
