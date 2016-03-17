module.exports = () => {
  return function buildModulePaths(components) {
    const bootstrapFileName = 'index.js';
    const componentsPath = './components';

    return components.map(component => `${componentsPath}/${component.name}/${bootstrapFileName}`);
  };
};
