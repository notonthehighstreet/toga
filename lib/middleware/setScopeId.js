module.exports = (req, res, next) => {
  if (req.query.scopeid) {
    req.scopeId = req.query.scopeid;
  }
  next();
};
