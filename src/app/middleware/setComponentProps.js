module.exports = (deps) => {
  const {
    '/lib/utils/errors': { BadRequestError },
    '/config/index': getConfig,
    url
  } = deps;
  const config = getConfig();

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
    }
  };
};
