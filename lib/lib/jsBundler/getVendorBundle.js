const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const bundle = require('./bundle');

module.exports = function getBundleVendor({componentNames}) {
  const bootstrapFileName = 'bootstrap.js';
  const componentsPath = './components';
  const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
  const definitions = {};
  const bundleId = modulePaths.join('-');

  return getCache('vendor-' + bundleId)
    .then((cachedVendorBundle) => {
      return cachedVendorBundle;
    })
    .catch(()=> {
      return  bundle({modulePaths, definitions}).then((data) => {
        setCache(`component-${bundleId}`, data['component']);
        setCache(`vendor-${bundleId}`, data['vendor']);
        return data.vendor;
      });
    });
};
