module.exports = (deps) => {
  return {
    path(component, file = 'index.js') {
      const {
        '/config/index': config
      } = deps;
      const {componentsPath} = config;
      return [].concat(component).map(name => `${componentsPath}/${name}/${file}`);
    },
    bundleId(component, { minify } = {}) {
      return [].concat(component).join('__') + (minify ? '.min' : '');
    }
  };
};
