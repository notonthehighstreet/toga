'use strict';

var componentPath = __dirname;
var renderComponent = require('renderers').renderComponent;
var loadData = function(callback) {
  callback(null, {
    'USER_NAME': 'Chris'
  });
};

module.exports = {
  render: function(locale, callback) {
    renderComponent(componentPath, locale, loadData, callback);
  }
};
