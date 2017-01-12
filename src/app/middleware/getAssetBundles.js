module.exports = (deps) => {
  const {
    '/lib/utils/bundleFilename': bundleFilename,
    '/config/index': getConfig,
    '/lib/getComponentInfo': getComponentInfo
  } = deps;

  return function getAssetBundles(req, res) {
    const { components = {} } = getConfig();
    const allComponents = getComponentInfo();
    const jsonResponse = {};
    const allBundles = allComponents.concat(components.bundles);
    allBundles.forEach(bundle => {
      const filename = bundleFilename(bundle.name, { minify: true });
      jsonResponse[bundle.name] = {
        js: `${bundle.name}/${filename}.js`,
        css: `${bundle.name}/${filename}.css`
      };
    });
    res.json(jsonResponse);
  };
};
