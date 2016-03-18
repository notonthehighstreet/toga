module.exports = (deps) => {
  return function getComponentBundle({components, locale}) {
    const {
      '/cache/set': setCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/lib/buildModulePaths': buildModulePaths
      } = deps;

    if (components.length === 0) {
      return Promise.reject(new Error('A bundle without components can not be created'));
    }

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
