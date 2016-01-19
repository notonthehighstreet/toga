'use strict';

var ReactDOMServer = require('react-dom/server');
var React = require('react');
var createT = require('./createT');

module.exports = function (_ref) {
  var phrases = _ref.phrases;
  var component = _ref.component;

  var t = createT({ phrases: phrases });

  return ReactDOMServer.renderToString(React.createElement(component, { t: t }));
};