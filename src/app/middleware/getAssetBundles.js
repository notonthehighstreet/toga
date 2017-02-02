const bundles = require(process.cwd() + '/dist/components/asset-bundles.json');

module.exports = () => {
  // route should be deprecated in favour of getting bundles from CDN
  return function getAssetBundles(req, res) {
    res.removeHeader('ETag');
    res.json(bundles);
  };
};
