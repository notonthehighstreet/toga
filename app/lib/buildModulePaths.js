module.exports = (deps) => {
  return function buildModulePaths(components) {
    const {'/lib/getAppConfig': getAppConfig } = deps;
    const bootstrapFileName = 'index.js';
    const { componentsPath } = getAppConfig();

    return components.map(component => `${componentsPath}/${component.name}/${bootstrapFileName}`);
  };
};
