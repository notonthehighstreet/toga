module.exports = (deps) => {
  return function logRequests(req, res, next) {
    const {
        '/logger': getLogger
      } = deps;

    const logger = getLogger();
    logger.info({
      url: req.url,
      query: req.query,
      start: req.get('X-Request-Start')
    });
    next();
  };
};
