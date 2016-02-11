const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const compileBundle = require('./compileBundle');
const getComponentManifest = require('../../lib/getComponentManifest');
const getComponentDependencies = require('../../lib/getComponentDependencies');
const _ = require('lodash');

module.exports = function getStylesBundle({componentNames}) {
  if (!_.isArray(componentNames)) {
    return Promise.reject('getStylesBundle `components` parameter needs to be an Array');
  }
  const bundleId = componentNames.join('-');

  return getCache(`styles-${bundleId}`)
    .catch(()=> {
      let requiredComponents = [];// Requested components + their children

      componentNames.forEach((componentName) => {
        const manifest = getComponentManifest(componentName);
        requiredComponents = getComponentDependencies(manifest).concat(requiredComponents);
      });
      requiredComponents = _.uniq(requiredComponents);

      return compileBundle({componentNames: requiredComponents}).then((data) => {
        setCache(`styles-${bundleId}`, data);
        return data;
      });
    });
};
