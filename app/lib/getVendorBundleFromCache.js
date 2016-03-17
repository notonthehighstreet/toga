module.exports = (deps) => {
  return function getVendorBundle({componentNames}) {
    const {
      '/cache/get': getCache
      } = deps;

    const bootstrapFileName = 'index.js';
    const componentsPath = './components';
    const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
    const bundleId = modulePaths.join('-');

    return getCache('vendor-' + bundleId);
  };
};

