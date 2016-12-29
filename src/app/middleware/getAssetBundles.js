module.exports = (deps) => {
  const {
    '/lib/bundler/bundleFilename': bundleFilename,
    '/config/index': getConfig
  } = deps;

  return function getAssetBundles(req, res) {
    const { components = {} } = getConfig();
    const jsonResponse = {};
    (components.bundles || []).forEach(bundle => {
      const filename = bundleFilename(bundle.name, { minify: true });
      jsonResponse[bundle.name] = {
        js: `${bundle.name}/${filename}.js`,
        css: `${bundle.name}/${filename}.css`
      };
    });
    res.json(jsonResponse);
  };
};
