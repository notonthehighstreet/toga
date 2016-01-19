'use strict';

var Polyglot = require('node-polyglot');

module.exports = function (_ref) {
  var phrases = _ref.phrases;

  var polyglot = new Polyglot({ phrases: phrases });

  return polyglot.t.bind(polyglot);
};