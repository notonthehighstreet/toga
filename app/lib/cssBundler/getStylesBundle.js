module.exports = (deps) => {
  return function getStylesBundle({componentNames}) {
    const {
      '/cache/get': getCache,
      '/cache/set': setCache,
      '/lib/cssBundler/sass/compileBundle': compileBundle,
      '/lib/cssBundler/addPrefixes': addPrefixes,
      '/lib/getComponentManifest': getComponentManifest,
      '/lib/getComponentDependencies': getComponentDependencies,
      'lodash': _
      } = deps;
    const cacheStyles = (bundleId) => {
      return (cssContent) => {
        setCache(`styles-${bundleId}`, cssContent);

        return cssContent;
      };
    };

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
};
