'use strict';

var createT = require('./createT');

module.exports = function (_ref, cb) {
  var phrases = _ref.phrases;

  var t = createT({ phrases: phrases });

  cb({ t: t });
};