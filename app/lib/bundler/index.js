module.exports = (deps) => {

  const {
    '/cache/set': setCache,
    '/cache/get': getCache,
    '/lib/bundler/buildHash': buildHash,
    '/lib/bundler/bundle': bundle,
    '/lib/getAppConfig': getAppConfig,
    '/utils/pathsExist': pathsExist,
    '/lib/bundler/createModulePaths': createModulePaths
  } = deps;

  return function togaBundle(component, opts = {}) {
    const { apiVersion, componentsPath } = getAppConfig();
    const minify = opts.minify || false;
    const togaHash = buildHash(componentsPath);
    const modulePaths = createModulePaths(component);

    function getAsset(assetType) {
      return getCache(getCacheId(assetType))
        .then((data) => data || bundleAndSave(assetType));
    }

    function saveAsset(assetType, bundles) {
      return setCache(getCacheId(assetType), bundles[assetType]);
    }

    function bundleAndSave(assetType) {
      let assets;
      return pathsExist(modulePaths)
        .then(() => {
          return bundle(component, { minify });
        }).then((bundles) => {
          assets = bundles;
          // to do: move js/css to consts file to be used with getComponentAssets + routes/components/index.js
          return Promise.all([saveAsset('js', assets), saveAsset('css', assets)]);
        }).then(() => {
          return assets[assetType];
        });
    }

    function getCacheId(assetType) {
      const bundleId = [].concat(component).join('__') + (minify ? '.min' : '');
      return `${apiVersion}-${togaHash}-${assetType}-${bundleId}`;
    }

    return { getAsset };
  };
};
