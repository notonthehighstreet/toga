const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const bundle = require('./bundle');

module.exports = function getBundleComponent({componentName, locale}) { // TODO add promise conventions to guidelines
  const bootstrapFileName = 'bootstrap.js';
  const componentsPath = './components';
  const modulePath = `${componentsPath}/${componentName}/${bootstrapFileName}`;
  const bundleId = `${modulePath}`;
  const definitions = {
    BUNDLE_LOCALE: `"${locale}"`
  };

  return getCache('component-' + bundleId)
    .then((cachedComponentBundle) => {
      return cachedComponentBundle;
    })
    .catch(()=> {
      return  bundle({modulePaths: [modulePath], definitions}).then((data) => {
        setCache(`component-${bundleId}`, data['component']);
        setCache(`vendor-${bundleId}`, data['vendor']);
        return data.component;
      });
    });
};
