/*eslint no-unused-vars: [2, { "argsIgnorePattern": "next" }]*/
module.exports = (deps) => {
  return function errorHandler(err, req, res, next) {
    const {
      '/logger': getLogger
    } = deps;
    const logger = getLogger();
    switch (err.name) {
    case 'NotFoundError' :
      res.status(404).send(err.message.toString());
      break;
    case 'BadRequestError' :
      res.status(400).send(err.message.toString());
      break;
    default :
      res.status(500).send(err.toString());
    }
    logger.fatal({
      status: res.statusCode,
      err
    });
  };
};
