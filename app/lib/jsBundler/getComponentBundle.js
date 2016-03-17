module.exports = (deps) => {
  return function getComponentBundle({components, locale = 'en'}) {
    const {
      '/cache/set': setCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/lib/buildModulePaths': buildModulePaths
      } = deps;

    const definitions = {
      BUNDLE_LOCALE: `"${locale}"`
    };
    const modulePaths = buildModulePaths(components);
    const bundleId = `${modulePaths.join('-')}=${locale}`;

    return bundle({modulePaths, definitions})
      .then((bundles) => {
        return Promise.all([
          setCache(`component-${bundleId}`, bundles['component']),
          setCache(`vendor-${bundleId}`, bundles['vendor'])
        ])
          .then(() => bundles.component);
      });
  };
};
