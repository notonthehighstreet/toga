module.exports = (deps) => {
  const {
    '/lib/utils/errors': { BadRequestError }
  } = deps;

  const componentContext = (encodedConfig) => {
    return (encodedConfig === undefined)
      ? {}
      : JSON.parse(decodeURIComponent(encodedConfig));
  };

  const parse = (json, next) => {
    try {
      return componentContext(json);
    }
    catch(error) {
      return next(new BadRequestError(`Context is not valid JSON: ${json}`));
    }
  };

  return {
    html(req, res, next) {
      const raw = !!req.params[0];
      req.componentName = req.params.componentName;
      req.context = parse(req.query.context, next);
      req.assetType = 'html';
      req.raw = raw;
      next();
    },
    map(req, res, next) {
      const isMin = !!req.params[0];
      const assetType = req.params[1];
      req.components = req.params.components.split('__');
      req.assetType = assetType + '.map';
      req.minify = isMin;
      next();
    },
    asset(req, res, next) {
      const isVendor = !!req.params[0];
      const isMin = !!req.params[1];
      const assetType = req.params[2];
      req.components = isVendor ? 'vendor' : parse(req.query.components);
      req.assetType = assetType;
      req.minify = isMin;
      next();
    }
  };
};
