require('babel-core/register');
const express = require('express');
const app = express();

const i18n = require('i18n');
app.use(i18n.middleware);
app.use(require('./app/routes'));

app.set('views', './public');

const server = app.listen(8888, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
