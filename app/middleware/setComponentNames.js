module.exports = (deps) => {
  return function setComponentNames(req, res, next) {
    const {
      '/middleware/errors/badRequestError': BadRequestError
    } = deps;

    try {
      req.componentNames = JSON.parse(req.query.components);
      next();
    }
    catch (e) {
      next(new BadRequestError('Component names array is not valid JSON'));
    }
  };
};
