'use strict';
var Handlebars = require('handlebars');

var templateRender = function (rawTemplate, data) {
  var template = Handlebars.compile(rawTemplate);
  var rendered = template(data);
  return rendered;
};

module.exports = {
  render: templateRender
};
