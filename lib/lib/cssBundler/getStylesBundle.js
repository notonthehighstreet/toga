const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const compileBundle = require('./compileBundle');
const getComponentManifest = require('../../lib/getComponentManifest');
const getComponentDependencies = require('../../lib/getComponentDependencies');
const addPrefixes = require('./addPrefixes');
const _ = require('lodash');
const cacheStyles = (bundleId) => {
  return (cssContent) => {
    setCache(`styles-${bundleId}`, cssContent);

    return cssContent;
  };
};

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

      return compileBundle({componentNames: requiredComponents})
        .then(addPrefixes)
        .then(cacheStyles(bundleId));
    });
};
