module.exports = () => {
  return function getServerStatus(req, res, next) {
    res.json({'status': 'HEALTHY'});
    next();
  };
};
