module.exports = () => {
  const componentMatcher = /\.html$|\.raw\.html$|\.js$|\.css$|\.json$/;
  const buildPath = (requestPath) => {
    return requestPath.replace(componentMatcher, '');
  };

  return function setComponentPath(req, res, next) {
    if (componentMatcher.test(req.path)) {
      req.componentPath = buildPath(req.path);
    }
    next();
  };
};
