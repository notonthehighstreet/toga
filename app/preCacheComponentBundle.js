module.exports = (deps) => {
  return function preCacheComponentBundle() {
    const {
      'es6-promisify': promisify,
      'fs': fs,
      '/lib/jsBundler/getComponentBundle': getComponentBundle
      } = deps;

    const readdir = promisify(fs.readdir);

    return readdir('./components')
      .then((components) => {
        const promises = components
          .filter((componentName) => fs.statSync(`./components/${componentName}`).isDirectory())
          .map((componentName) => {
            return getComponentBundle({components: [{name: componentName}], locale: 'en'});
          });
        return Promise.all(promises);
      });
  };
};
