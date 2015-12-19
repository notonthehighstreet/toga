'use strict';
var _ = require('lodash');
var componentPath = __dirname;
var componentLoader = require('component-loader');
var templateRender = require('renderers').renderTemplate

var config = {};

var renderComponent = function (locale, callback){
  componentLoader.load(componentPath, locale, function(template, translations){
    var templateData = {};

    _.merge(templateData, translations);

    var renderedComponent = templateRender(template, templateData);
    callback(renderedComponent);
  });
};

module.exports =  {
  render: renderComponent
};
