module.exports = (deps) => {
  return function buildBundleId(components, minify) {
    const {
      '/lib/buildModulePaths': buildModulePaths
    } = deps;
    const modulePaths = buildModulePaths(components);
    const bundleId = [].concat(components).join('__') + (minify ? '.min' : '');
    return { bundleId, modulePaths };
  };
};
