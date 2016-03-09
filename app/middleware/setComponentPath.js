module.exports = () => {
  return function setComponentPath(req, res, next) {
    const buildPath = (requestPath) => {
      return requestPath.replace(/\.html$|\.raw\.html$|\.js$|\.css$|\.json$/, '');
    };

    req.componentPath = buildPath(req.path);
    next();
  };
};
