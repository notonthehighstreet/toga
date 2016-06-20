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

    return readdir(componentsPath)
      .then((components) => {
        const promises = components
          .filter((componentName) => fs.statSync(`${componentsPath}/${componentName}`).isDirectory())
          .map((componentName) => {
            return getComponentBundle({components: [{name: componentName}], locale: 'en'});
          });
        return Promise.all(promises);
      });
  };
};
