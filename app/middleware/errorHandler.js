/*eslint no-unused-vars: [2, { "argsIgnorePattern": "next" }]*/
module.exports = (deps) => {
  return function errorHandler(err, req, res, next) {
    const {
      '/logger': getLogger,
      '/middleware/errors/notFoundError': NotFoundError,
      '/middleware/errors/badRequestError': BadRequestError
    } = deps;
    const logger = getLogger();

    if (err instanceof NotFoundError) {
      res.status(404).send(err.message.toString());
    }
    else if (err instanceof BadRequestError) {
      res.status(400).send(err.message.toString());
    }
    else {
      res.status(500).send(err.toString());
    }

    logger.fatal(err);
  };
};
