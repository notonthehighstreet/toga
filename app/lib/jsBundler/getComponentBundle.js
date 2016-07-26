module.exports = (deps) => {
  return function getComponentBundle(component, assetType, minify) {
    const {
      '/cache/set': setCache,
      '/cache/get': getCache,
      '/lib/jsBundler/webpack/runBundler': bundle,
      '/lib/buildBundleId': buildBundleId,
      '/lib/buildBundleHash': buildBundleHash,
      '/lib/jsBundler/vendorFiles': vendorFiles,
      '/lib/getAppConfig': getAppConfig
    } = deps;

    const { apiVersion } = getAppConfig();

    if (component.length === 0) {
      return Promise.reject(new Error('A bundle without a component can not be created'));
    }

    const definitions = { };
    const { modulePaths, bundleId } = buildBundleId(component, minify);
    const externals = component==='vendor' ? [] : vendorFiles;

    return buildBundleHash().then((hash) => {
      return getCache(`${apiVersion}-${hash}-${assetType}-${bundleId}`)
        .catch(()=> {
          return bundle({ component, modulePaths, definitions, externals, minify })
            .then((bundles) => {
              return Promise.all([
                setCache(`${apiVersion}-${hash}-scripts-${bundleId}`, bundles['scripts']),
                setCache(`${apiVersion}-${hash}-styles-${bundleId}`, bundles['styles'])
              ]).then(() => bundles[assetType]);
            });
        });
    });

  };
};
