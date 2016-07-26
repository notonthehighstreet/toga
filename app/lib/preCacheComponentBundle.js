module.exports = (deps) => {
  return function preCacheComponentBundle(components) {
    const {
      '/lib/jsBundler/getComponentBundle': getComponentBundle
    } = deps;
    if (!Array.isArray(components)) {
      throw new Error('Components must be an array: ' + typeof components);
    }
    const buildBundles = (component) => {
      return Promise.all([
        getComponentBundle(component, 'component', true),
        getComponentBundle(component, 'component', false)
      ]);
    };
    return Promise.all(components.map(buildBundles));
  };
};
