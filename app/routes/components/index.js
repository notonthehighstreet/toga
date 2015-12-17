'use strict';
var componentsPath = "app/components";
var path = require('path');

var buildComponentPath = function (url) {
  var componentPath = componentsPath + url;

  // Remove the trailing slash that is appened by static asset loader
  var pathParts = componentPath.split(path.sep);
  pathParts.pop();
  componentPath = pathParts.join(path.sep);
  return componentPath;
};

module.exports = function(app) {

  app.get(/.*\/$/, function (req, res) {
    var locale = res.locals.locale;

    var componentPath = buildComponentPath(req.originalUrl);
    var component = require(componentPath)(locale);

    component.render(function(renderedComponent){
      res.send(renderedComponent);
    });
  });

  return app;
}
