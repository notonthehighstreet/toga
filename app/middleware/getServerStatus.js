module.exports = () => {
  return function getServerStatus(req, res) {
    res.json({'status': 'HEALTHY'});
  };
};
