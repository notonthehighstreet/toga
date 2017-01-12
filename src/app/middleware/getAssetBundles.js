const { assetUrl } = require('../lib/utils/assetUrl');

module.exports = (deps) => {
  const {
    '/lib/utils/bundleFilename': bundleFilename,
    '/config/index': getConfig
  } = deps;

  return function getAssetBundles(req, res) {
    const { components = {} } = getConfig();
    const jsonResponse = {};
    (components.bundles || []).forEach(bundle => {
      const filename = bundleFilename(bundle.name, { minify: true });
      jsonResponse[bundle.name] = {
        js: `${assetUrl()}${bundle.name}/${filename}.js`,
        css: `${assetUrl()}${bundle.name}/${filename}.css`
      };
    });
    res.json(jsonResponse);
  };
};
