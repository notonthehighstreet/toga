module.exports = (deps) => {
  const {
    '/lib/utils/errors': { BadRequestError },
    '/config/index': config
  } = deps;
  const { vendorBundleComponent } = config;

  const setControllerName = (url) => {
    if(config.newRelicEnabled) {
      const newRelic = require('newrelic');
      newRelic.setControllerName(url)
    }
  };

  const encodeJson = (encodedConfig) => {
    return (encodedConfig === undefined)
      ? {}
      : JSON.parse(decodeURIComponent(encodedConfig));
  };

  const parse = (json, next) => {
    try {
      return encodeJson(json);
    }
    catch(error) {
      return next(new BadRequestError(`Props is not valid JSON: ${json}`));
    }
  };

  return {
    html(req, res, next) {
      setControllerName(req.originalUrl);
      req.componentName = req.params.componentName;
      req.props = parse(req.query.props, next);
      req.assetType = 'html';
      req.raw = !!req.params[0];
      next();
    },
    map(req, res, next) {
      setControllerName(req.originalUrl);
      req.components = req.params.components.split('__');
      req.assetType = req.params[1] + '.map';
      req.minify = !!req.params[0];
      next();
    },
    asset(req, res, next) {
      setControllerName(req.originalUrl);
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
