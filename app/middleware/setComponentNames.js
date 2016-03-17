module.exports = () => {
  return function setComponentNames(req, res, next) {
    try {
      req.componentNames = JSON.parse(req.query.components);
      next();
    }
    catch (e) {
      next(e);
    }
  };
};
