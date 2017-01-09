module.exports = (deps) => {
  const {
    '/lib/utils/bundleFilename': bundleFilename,
    '/config/index': getConfig
  } = deps;

  return function getAssetBundles(req, res) {
    const { assets, components = {} } = getConfig();
    const jsonResponse = {};
    (components.bundles || []).forEach(bundle => {
      const filename = bundleFilename(bundle.name, { minify: true });
      jsonResponse[bundle.name] = {
        js: `//${assets.host}/${assets.prefix}${bundle.name}/${filename}.js`,
        css: `//${assets.host}/${assets.prefix}${bundle.name}/${filename}.css`
      };
    });
    res.json(jsonResponse);
  };
};
