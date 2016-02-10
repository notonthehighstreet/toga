const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const compile = require('./compile');
const getComponentManifest = require('../../lib/getComponentManifest');
const getComponentDependencies = require('../../lib/getComponentDependencies');
const _ = require('lodash');

module.exports = function getStylesBundle({components}) {
  if (!_.isArray(components)) {
    return Promise.reject('getStylesBundle `components` parameter needs to be an Array');
  }
  const bundleId = components.join('-');

  return getCache(`styles-${bundleId}`)
    .catch(()=> {
      let requiredComponents = [];// Requested components + their children

      components.forEach((componentName) => {
        const manifest = getComponentManifest(componentName);
        requiredComponents = getComponentDependencies(manifest).concat(requiredComponents);
      });
      requiredComponents = _.uniq(requiredComponents);

      return compile({components: requiredComponents}).then((data) => {
        setCache(`styles-${bundleId}`, data);
        return data;
      });
    });
};
