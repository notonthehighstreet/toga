module.exports = (deps) => {
  return function preCacheComponentBundle() {
    const {
      'es6-promisify': promisify,
      'fs': fs,
      '/lib/jsBundler/getComponentBundle': getComponentBundle,
      '/lib/getAppConfig': getAppConfig
      } = deps;

    const readdir = promisify(fs.readdir);
    const { componentsPath } = getAppConfig();

    // todo : require and read react.js file into redisCache
    // setCache(`vendor-${bundleId}`, bundles['vendor']),

    return readdir(componentsPath)
      .then((components) => {
        const promises = components
          .filter((componentName) => fs.statSync(`${componentsPath}/${componentName}`).isDirectory())
          .map((component) => getComponentBundle(component, 'component', process.env.NODE_ENV === 'production'));
        return Promise.all(promises);
      });
  };
};
