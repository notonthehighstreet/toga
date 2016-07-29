module.exports = (deps) => {
  return function createModulePath(component, file = 'index.js') {
    const {
      '/lib/getAppConfig': getAppConfig
    } = deps;
    const { componentsPath } = getAppConfig();
    return [].concat(component).map(name => `${componentsPath}/${name}/${file}`);
  };
};
