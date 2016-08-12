module.exports = (deps) => {
  const {
    '/lib/utils/errors': { BadRequestError },
    '/lib/getAppConfig': getAppConfig
  } = deps;
  const { vendorBundleComponent } = getAppConfig();

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
      req.componentName = req.params.componentName;
      req.context = parse(req.query.context, next);
      req.assetType = 'html';
      req.raw = !!req.params[0];
      next();
    },
    map(req, res, next) {
      req.components = req.params.components.split('__');
      req.assetType = req.params[1] + '.map';
      req.minify = !!req.params[0];
      next();
    },
    asset(req, res, next) {
      const qComponents = parse(req.query.components, next);
      const pComponentName = req.params.componentName;
      const components = pComponentName === 'components-vendor-bundle' ? vendorBundleComponent : pComponentName;
      req.components = pComponentName === 'components' ? qComponents : components;
      req.assetType = req.params[1];
      req.minify = !!req.params[0];
      next();
    }
  };
};
