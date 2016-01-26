'use strict';

var ReactDOMServer = require('react-dom/server');
var React = require('react');

module.exports = function (_ref) {
  var component = _ref.component;

  return ReactDOMServer.renderToString(React.createElement(component));
};