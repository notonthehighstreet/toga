var express = require('express');
var app = express();

var i18n = require('app/lib/i18n');
app.use(i18n.middleware);

var routes = require('./app/routes')(app);

app.set('views', './public');

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
