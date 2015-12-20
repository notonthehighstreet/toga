'use strict';
var componentsPath = "../../components";
var path = require('path');

var buildComponentPath = function (url) {
  var componentPath = componentsPath + url.replace('.html', '');
  return componentPath;
};

module.exports = function(app) {

  app.get(/.*\.html$/, function (req, res) {
    var locale = res.locals.locale;

    var componentPath = buildComponentPath(req.path);
    var component = require(componentPath);

    component.render(locale, function(renderedComponent){
      res.send(renderedComponent);
    });
  });

  return app;
}
