module.exports = (deps) => {
  return function getVendorBundle({componentNames}) {
    const {
      '/cache/get': getCache,
      '/cache/set': setCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/logger': getLogger
    } = deps;

    if (componentNames.length === 0) {
      return Promise.reject(new Error('A bundle without components can not be created'));
    }

    const logger = getLogger();
    const bootstrapFileName = 'index.js';
    const componentsPath = './components';
    const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
    const definitions = {};
    const bundleId = modulePaths.join('-');

    return getCache('vendor-' + bundleId)
      .then((cachedVendorBundle) => {
        logger.info('Vendor Bundle retreived for: ', bundleId);
        return cachedVendorBundle;
      })
      .catch((err)=> {
        logger.error('Vendor Bundle retreival failed for: ', bundleId, err);
        return  bundle({modulePaths, definitions}).then((data) => {
          logger.warn('Performing slow run-time bundle for: ', bundleId);
          setCache(`component-${bundleId}`, data['component']);
          setCache(`vendor-${bundleId}`, data['vendor']);
          return data.vendor;
        });
      });
  };
};
