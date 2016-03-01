const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const bundle = require('./runBundler');
const logger = require('../logger');

module.exports = function getBundleVendor({componentNames}) {
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
