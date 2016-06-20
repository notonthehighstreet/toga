module.exports = (deps) => {
  return function getVendorBundle({componentNames}) {
    const {
      '/cache/get': getCache,
      '/lib/getAppConfig': getAppConfig
      } = deps;

    const bootstrapFileName = 'index.js';
    const { componentsPath } = getAppConfig();
    const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
    const bundleId = modulePaths.join('-');

    return getCache('vendor-' + bundleId);
  };
};

