'use strict';
var componentPath = __dirname;
var renderComponent = require('renderers').renderComponent;

var loadData = function (callback) {
  callback(null, {
    "CURRENT_YEAR": new Date().getUTCFullYear()
  });
};

module.exports = {
  render: function(locale, callback){
    renderComponent(componentPath, locale, loadData, callback);
  }
};
