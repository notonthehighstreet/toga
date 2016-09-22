module.exports = () => {
  return {
    bundleId(component, { minify } = {}) {
      const sortedComponents = Array.isArray(component) ? component.sort() : [component];
      return sortedComponents.join('__') + (minify ? '.min' : '');
    }
  };
};
