const crypto = require('crypto');

module.exports = (req, res, next) => {
  const mountNodeId = req.query.mountNodeId || crypto.createHash('sha256').update(req.componentPath).digest('hex').slice(0, 8);

  req.mountNodeId = mountNodeId;
  next();
};
