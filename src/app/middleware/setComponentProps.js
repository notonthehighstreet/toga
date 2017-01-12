module.exports = (deps) => {
  const {
    '/lib/utils/errors': { BadRequestError },
    '/config/index': getConfig,
    url
  } = deps;
  const config = getConfig();
  const { vendor } = config;

  const setControllerName = (reqUrl) => {
    if(config.newRelicEnabled) {
      const newRelic = require('newrelic');
      newRelic.setControllerName(url.parse(reqUrl).pathname);
    }
  };

  const encodeJson = (props) => {
    return (props === undefined)
      ? {}
      : JSON.parse(props);
  };

  const parse = (props, next) => {
    try {
      return encodeJson(props);
    }
    catch(error) {
      return next(new BadRequestError(`Invalid props: ${props}`, error));
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
      const queryComponents = parse(req.query.components, next);
      const paramsComponentName = req.params.componentName;
      const components = paramsComponentName === 'components-vendor-bundle' ? [vendor.componentName] : [paramsComponentName];
      req.components = paramsComponentName === 'components' ? queryComponents : components;
      req.assetType = req.params[1];
      req.minify = !!req.params[0];
      next();
    }
  };
};
