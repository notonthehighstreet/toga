/*eslint no-unused-vars: [2, { "argsIgnorePattern": "next" }]*/
module.exports = (deps) => {
  return function errorHandler(err, req, res, next) {
    const {
      '/logger': getLogger
    } = deps;
    const logger = getLogger();

    res.status(500).send(err.toString());
    logger.fatal(err);
  };
};
