module.exports = (deps) => {
  return function getVendorBundle() {
    const {
      '/cache/set': setCache,
      '/cache/get': getCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/lib/jsBundler/vendorFiles': vendorFiles,
      debug
    } = deps;

    const log = debug('toga:getVendorBundle');
    const definitions = { };
    const bundleId = vendorFiles.join('__');
    const modulePaths = vendorFiles;

    return getCache(`vendor-${bundleId}`)
      .catch(()=> {
        log('create vendor config ', bundleId);
        return bundle({ modulePaths, definitions })
          .then((bundles) => {
            log('saving into cache: ', bundleId);
            return Promise.all([
              setCache(`vendor-${bundleId}`, bundles['vendor'])
            ]).then(() => bundles.vendor);
          });
      });
  };
};
