module.exports = (deps) => {
  const {
    '/lib/bundler/bundleFilename': bundleFilename,
    '/config/index': getConfig,
    '/lib/getComponentInfo': getComponentInfo,
  } = deps;

  return function getAssetBundles(req, res) {
    const { vendor } = getConfig();

    const allComponents = getComponentInfo();
    const componentNames = allComponents
      .filter((componentInfo) => componentInfo.name !== 'vendor')
      .map(componentInfo => componentInfo.name);

    const allComponentsFileName = bundleFilename(componentNames, { minify: true });
    const vendorFileName = bundleFilename([vendor.componentName], { minify: true });

    res.json({
      'all': {
        'js': [
          `${vendorFileName}.js`,
          `${allComponentsFileName}.js`,
        ],
        'css': [
          `${allComponentsFileName}.css`,
        ]
      }
    });
  };
};
