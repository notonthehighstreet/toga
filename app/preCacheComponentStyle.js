module.exports = (deps) => {
  return function preCacheComponentStyle() {
    const {
      'es6-promisify': promisify,
      'fs': fs,
      '/lib/cssBundler/getStylesBundle': getComponentStyle
      } = deps;

    const readdir = promisify(fs.readdir);

    return readdir('./components')
      .then((components) => {
        const promises = components
          .filter((componentName) => fs.statSync(`./components/${componentName}`).isDirectory())
          .map((componentName) => {
            return getComponentStyle({componentNames: [componentName]});
          });
        return Promise.all(promises);
      });
  };
};
