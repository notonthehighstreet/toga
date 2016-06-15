module.exports = (deps) => {
  return function getComponentBundle({components, locale}) {
    const {
      '/cache/set': setCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/lib/buildModulePaths': buildModulePaths,
      debug
    } = deps;

    if (components.length === 0) {
      return Promise.reject(new Error('A bundle without components can not be created'));
    }

    const log = debug('toga:getComponentBundle');
    const definitions = { };
    const modulePaths = buildModulePaths(components);
    const bundleId = `${modulePaths.join('-')}=${locale}`;
    const cssBundleId = components.map(c => c.name).join('-');

    return bundle({modulePaths, definitions})
      .then((bundles) => {
        log('saving into cache: ', cssBundleId);
        return Promise.all([
          setCache(`component-${bundleId}`, bundles['component']),
          setCache(`vendor-${bundleId}`, bundles['vendor']),
          setCache(`styles-${cssBundleId}`, bundles['styles'])
        ])
          .then(() => bundles.component);
      });
  };
};
