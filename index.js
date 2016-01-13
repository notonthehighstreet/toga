require('babel-core/register');
const express = require('express');
const app = express();
const i18n = require('i18n');
const debug = require('debug')('toga');

app.use(i18n.middleware);
app.use(require('./lib/routes'));
app.set('views', './public');

const server = app.listen(8080, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;

  debug('Example app listening at http://%s:%s', host, port);
});
