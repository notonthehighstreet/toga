module.exports = (deps) => {
  return function getComponentBundleFromCache({components, locale = 'en'}) {
    const {
      '/cache/get': getCache,
      '/lib/buildModulePaths': buildModulePaths
    } = deps;

    const modulePaths = buildModulePaths(components);
    const bundleId = `${modulePaths.join('-')}=${locale}`;

    return getCache(`component-${bundleId}`);
  };
};
