module.exports = (deps) => {
  return function preCacheComponentBundle(components) {
    const {
      '/lib/jsBundler/getComponentBundle': getComponentBundle
    } = deps;
    if (!Array.isArray(components)) {
      throw new Error('Components must be an array: ' + typeof components);
    }
    const buildBundle = (component) => getComponentBundle(component, 'component', false);
    return Promise.all(components.map(buildBundle));
  };
};
