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
    const bundleId = componentNames.join('-');

    if (!_.isArray(componentNames)) {
      return Promise.reject('getStylesBundle `components` parameter needs to be an Array');
    }

    return getCache(`styles-${bundleId}`)
      .catch(()=> {
        let requiredComponents = _.chain(componentNames)
          .map(componentName => getComponentDependencies(getComponentManifest(componentName)))
          .flatten()
          .uniq()
          .value();

        return compileBundle({componentNames: requiredComponents})
          .then(addPrefixes)
          .then(cacheStyles(bundleId));
      });
  };
};
