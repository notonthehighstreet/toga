module.exports = () => {
  return {
    bundleId(component, { minify } = {}) {
      return [].concat(component).join('__') + (minify ? '.min' : '');
    }
  };
};
