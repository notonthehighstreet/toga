module.exports = (deps) => {
  return function getComponentBundle(components, assetType, minify) {
    const {
      '/cache/set': setCache,
      '/cache/get': getCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/lib/buildBundleId': buildBundleId,
      '/lib/jsBundler/vendorFiles': vendorFiles,
      debug
    } = deps;

    if (components.length === 0) {
      return Promise.reject(new Error('A bundle without components can not be created'));
    }

    const log = debug('toga:getComponentBundle');
    const definitions = { };
    const { modulePaths, bundleId } = buildBundleId(components, minify);
    const externals = components==='vendor' ? [] : vendorFiles;

    return getCache(`${assetType}-${bundleId}`)
      .catch(()=> {
        return bundle({ modulePaths, definitions, externals, minify })
          .then((bundles) => {
            log('saving into cache: ', bundleId);
            return Promise.all([
              setCache(`scripts-${bundleId}`, bundles['scripts']),
              setCache(`styles-${bundleId}`, bundles['styles'])
            ]).then(() => bundles[assetType]);
          });
      });
  };
};
