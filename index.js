require('babel-core/register');
const express = require('express');
const app = express();
const debug = require('debug')('toga');

app.use(require('./lib/routes'));
app.set('views', './public');

const server = app.listen(8080, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;

  debug('Example app listening at http://%s:%s', host, port);
});
