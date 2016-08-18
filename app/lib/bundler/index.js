module.exports = (deps) => {

  return function togaBundle(componentNames, opts = {}) {
    const {
      '/cache/set': setCache,
      '/cache/get': getCache,
      '/config/index': config,
      '/lib/bundler/buildHash': buildHash,
      '/lib/bundler/bundle': bundle,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/utils/pathsExist': pathsExist,
      '/lib/utils/errors': { NotFoundError, BundleError },
      '/lib/utils/componentHelper': componentHelper,
      debug
    } = deps;

    const log = debug('toga:bundler/index');

    const { apiVersion } = config;
    const minify = opts.minify || false;
    const components = getComponentInfo(componentNames);
    const getCacheId = (assetType) => (
      `${apiVersion}-${togaHash}-${componentHelper.bundleId(componentNames, { minify })}.${assetType}`
    );
    const togaHash = buildHash(components.map(component => component.path));
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
      return pathsExist(modulePaths)
        .then((exists) => {
          if (exists) {
            log(`${components.name} ${assetType} (min: ${minify})`)
            return bundle(components, { modulePaths, minify });
          }
          else {
            throw new NotFoundError(`Path not found: ${modulePaths}`);
          }
        }).then((bundles) => {
          assets = bundles;
          // to do: move js/css to consts file to be used with getComponentAssets + routes/components/index.js
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
