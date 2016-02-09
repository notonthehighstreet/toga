const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const bundle = require('./bundle');

module.exports = function getComponentBundle({components, locale = 'en'}) {
  const bootstrapFileName = 'bootstrap.js';
  const componentsPath = './components';
  const definitions = {
    BUNDLE_LOCALE: `"${locale}"`
  };
  let modulePaths = [];

  components.forEach((component) => {
    modulePaths.push(`${componentsPath}/${component.name}/${bootstrapFileName}`);
  });
  const bundleId = modulePaths.join('-') + '=' + locale;

  return getCache('component-' + bundleId)
    .then((cachedComponentBundle) => {
      return cachedComponentBundle;
    })
    .catch(()=> {
      return  bundle({modulePaths, definitions}).then((data) => {
        setCache(`component-${bundleId}`, data['component']);
        setCache(`vendor-${bundleId}`, data['vendor']);
        return data.component;
      });
    });
};
