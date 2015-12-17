'use strict';
var _ = require('lodash');
var componentPath = __dirname;
var componentLoader = require('app/lib/component-loader')(componentPath);
var templateRender = require('app/lib/renderers').renderTemplate

var config = {};

var renderComponent = function (callback){
  componentLoader.load(function(template, translations){
    var templateData = {};

    _.merge(templateData, getData());
    _.merge(templateData, translations);

    var renderedComponent = templateRender(template, templateData);
    callback(renderedComponent);
  }, config.locale);
};

var getData = function (callback) {
  return {
    "CURRENT_YEAR": new Date().getUTCFullYear()
  }
};

module.exports = function (locale) {
  config.locale = locale;

  return {
    render: renderComponent
  }
};
