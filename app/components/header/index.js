'use strict';
var _ = require('lodash');
var componentPath = __dirname;
var componentLoader = require('app/lib/component-loader')(componentPath);
var templateRender = require('app/lib/renderers').renderTemplate

var config = {};

var renderComponent = function (callback){
  componentLoader.load(function(template, translations){
    var templateData = {};

    _.merge(templateData, translations);

    var renderedComponent = templateRender(template, templateData);
    callback(renderedComponent);
  }, config.locale);
};

module.exports = function (locale) {
  config.locale = locale;

  return {
    render: renderComponent
  }
};
