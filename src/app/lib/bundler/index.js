module.exports = (deps) => {

  return function togaBundle(componentNames, opts = {}) {
    const {
      '/cache/set': setCache,
      '/cache/get': getCache,
      '/config/index': getConfig,
      '/lib/bundler/buildHash': buildHash,
      '/lib/bundler/bundle': bundle,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/utils/errors': { BundleError },
      '/lib/utils/componentHelper': componentHelper
    } = deps;
    const config = getConfig();

    const { apiVersion } = config;
    const minify = opts.minify || false;
    const components = getComponentInfo(componentNames);
    const getCacheId = (assetType) => (
      `${apiVersion}-${togaHash}-${componentHelper.bundleId(componentNames, { minify })}.${assetType}`
    );
    const togaHash = buildHash();
    const modulePaths = components.map(component => component.file);

    function getAsset(assetType) {
      return getCache(getCacheId(assetType))
        .then((data) => data || bundleAndSave(assetType));
    }

    function saveAsset(assetType, bundles) {
      return setCache(getCacheId(assetType), bundles[assetType]);
    }

    function bundleAndSave(assetType) {
      let assets;
      return bundle(components, { modulePaths, minify })
        .then((bundles) => {
          assets = bundles;
          return Promise.all([
            saveAsset('js', assets),
            saveAsset('css', assets),
            saveAsset('js.map', assets),
            saveAsset('css.map', assets)
          ]);
        }).then(() => {
          return assets[assetType];
        }).catch((err) => {
          throw new BundleError(err.message);
        });
    }

    return { getAsset };
  };
};
