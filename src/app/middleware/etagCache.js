module.exports = (deps) => {
  const {
    '/lib/utils/buildHash': buildHash,
    '/config/index': getConfig,
    url
  } = deps;

  const config = getConfig();

  const hash = buildHash();
  const returnHash = () => hash;

  const etagRequest = (req, res, next) => {
    if(req.get('If-None-Match') === hash) {
      if(config.newRelicEnabled) {
        const newRelic = require('newrelic');
        newRelic.setControllerName(`ETAG 304: ${url.parse(req.path).pathname}`);
      }
      res.sendStatus(304);
    }
    else {
      next();
    }
  };

  return { etagRequest, returnHash };
};
