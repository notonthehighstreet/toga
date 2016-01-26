'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = function (_ref) {
  var component = _ref.component;
  var scopeId = _ref.scopeId;

  ReactDOM.render(React.createElement(component), document.querySelector('#' + scopeId));
};