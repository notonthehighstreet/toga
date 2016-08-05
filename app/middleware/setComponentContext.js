module.exports = (deps) => {
  return function setComponentContext(req, res, next) {
    const {
      'lodash': _,
      '/lib/utils/errors': { BadRequestError }
    } = deps;

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

    }
    catch(error) {
      return next(new BadRequestError('Context is not valid JSON'));

    }

    try{
      req.componentPath = buildPath(req.path);

      if (req.path.indexOf('components-vendor-bundle')>-1) {
        req.components = 'vendor';
      }
    }
    catch(e) {
      return next(new BadRequestError('Path is not valid:', req.path));
    }

    next();
  };
};
