module.exports = (deps) => {
  return function getComponentBundleFromCache({components}) {
    const {
      '/cache/get': getCache
    } = deps;

    const bundleId = components.join('-');

    return getCache(`styles-${bundleId}`);
  };
};
