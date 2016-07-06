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
    const minify = false;

    return readdir(componentsPath)
      .then((components) => {
        const promises = components
          .filter((componentName) => fs.statSync(`${componentsPath}/${componentName}`).isDirectory())
          .map((component) => getComponentBundle(component, 'component', minify));
        return Promise.all(promises);
      });
  };
};
