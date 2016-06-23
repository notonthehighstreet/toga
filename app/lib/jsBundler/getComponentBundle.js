module.exports = (deps) => {
  return function getComponentBundle(components, assetType, minify) {
    const {
      '/cache/set': setCache,
      '/cache/get': getCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/lib/buildBundleId': buildBundleId,
      debug
    } = deps;

    if (components.length === 0) {
      return Promise.reject(new Error('A bundle without components can not be created'));
    }

    const log = debug('toga:getComponentBundle');
    const definitions = { };
    const { modulePaths, bundleId } = buildBundleId(components, minify);

    return getCache(`${assetType}-${bundleId}`)
      .catch(()=> {
        return bundle({ modulePaths, definitions, minify })
          .then((bundles) => {
            log('saving into cache: ', bundleId);
            return Promise.all([
              setCache(`component-${bundleId}`, bundles['component']),
              setCache(`vendor-${bundleId}`, bundles['vendor']),
              setCache(`styles-${bundleId}`, bundles['styles'])
            ]).then(() => bundles[assetType]);
          });
      });
  };
};
