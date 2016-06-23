module.exports = (deps) => {
  const {
    'lodash': _,
    '/middleware/errors/badRequestError': BadRequestError
  } = deps;
  return function setComponentContext(req, res, next) {
    
    const componentMatcher = /\.html$|\.raw\.html$|\.js$|\.css$|\.json$/;
    const buildPath = (requestPath) => {
      return requestPath.replace(componentMatcher, '');
    };

    const componentContext = (encodedConfig) => {
      return (_.isUndefined(encodedConfig))
        ? {}
        : JSON.parse(decodeURIComponent(encodedConfig));
    };

    try {
      req.components = componentContext(req.query.components);
      req.componentContext = componentContext(req.query.context);
      req.componentPath = buildPath(req.path);
      next();
    }
    catch(error) {
      next(new BadRequestError('Context is not valid JSON'));
    }
  };
};