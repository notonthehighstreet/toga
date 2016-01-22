const buildPath = (requestPath) => {
  return requestPath.replace(/\.html$|\/raw\.html$|\.js$|\.css$|\/vendor\.js$|\.json$/, '');
};

module.exports = (req, res, next) => {
  req.componentPath = buildPath(req.path);
  next();
};
