'use strict';
var express = require('express');

module.exports = function(app) {
  app.use(express.static('public'));
  return app;
}
