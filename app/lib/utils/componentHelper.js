module.exports = (deps) => {
  return {
    path(component, file = 'index.js') {
      const {
        '/lib/getAppConfig': getAppConfig
      } = deps;
      const {componentsPath} = getAppConfig();
      return [].concat(component).map(name => `${componentsPath}/${name}/${file}`);
    },
    bundleId(component, { minify } = {}) {
      return [].concat(component).join('__') + (minify ? '.min' : '');
    }
  };
};
