module.exports = (deps) => {
  return function createModulePath(component) {
    const {
      '/lib/getAppConfig': getAppConfig
    } = deps;
    const { componentsPath } = getAppConfig();
    return [].concat(component).map(name => `${componentsPath}/${name}/index.js`);
  };
};
