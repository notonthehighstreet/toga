'use strict';
var fs = require('fs');
var async = require('async');

var config = {}

var load = function (callback, locale) {
  setTranslationFile(locale);

  async.parallel([
    getTemplate,
    getTranslations
  ],function(err, results){
    var rawTemplate = results[0];
    var translations = results[1];

    callback(rawTemplate, translations);
  });
};

var readFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', callback);
};

var getTranslations = function (callback) {
  readFile(config.translationFile, function(err, dataRaw){
    var data = JSON.parse(dataRaw)
    callback(null, data);
  });
};

var getTemplate = function (callback) {
  readFile(config.templateFile, function(err, data){
    callback(null, data);
  });
};

var setTranslationFile = function (locale) {
  config.locale = locale;
  config.translationFile = config.componentPath + "/" + config.locale + ".json";
};

module.exports = function (componentPath) {
  config.componentPath = componentPath;
  config.templateFile = componentPath + "/index.html.tpl";

  return {
    load: load
  };
};
