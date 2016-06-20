module.exports = (deps) => {
  return function buildBundleId(components) {
    const {
      '/lib/buildModulePaths': buildModulePaths
    } = deps;
    const modulePaths = buildModulePaths(components);
    const bundleId = [].concat(components).join('-');
    return { bundleId, modulePaths };
  };
};
