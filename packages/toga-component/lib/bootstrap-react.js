'use strict';

var bootstrap = require('./bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');

module.exports = function (_ref) {
  var phrases = _ref.phrases;
  var component = _ref.component;
  var scopeId = _ref.scopeId;

  bootstrap({ phrases: phrases }, function (_ref2) {
    var t = _ref2.t;

    ReactDOM.render(React.createElement(component, { t: t }), document.querySelector('#' + scopeId));
  });
};