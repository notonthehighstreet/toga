const express = require('express');
const app = express();

app.use(require('./routes'));
app.use('/public', express.static('public'));

module.exports = app;
