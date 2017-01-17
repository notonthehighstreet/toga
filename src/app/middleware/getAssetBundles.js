const bundles = require(process.cwd() + '/dist/components/bundles.json');

module.exports = () => {
  // route should be deprecated in favour of getting bundles from CDN
  return function getAssetBundles(req, res) {
    res.json(bundles);
  };
};
