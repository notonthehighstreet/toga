const crypto = require('crypto');

module.exports = (req, res, next) => {
  const scopeId = req.query.scopeid || crypto.createHash('sha256').update(req.componentPath).digest('hex').slice(0, 8);

  req.scopeId = scopeId;
  next();
};
