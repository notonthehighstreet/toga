module.exports = {
  health: (req, res) => {
    res.json({'status': 'HEALTHY'});
  }
};
