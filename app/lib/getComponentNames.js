module.exports = (deps) => {
  return function getComponentNames() {
    const {
      '/config/index': config,
      fs
    } = deps;
    const { componentsPath } = config;

    const isComponentFolder = (name) => name !== 'lib' && fs.statSync(`${componentsPath}/${name}`).isDirectory();
    return fs.readdirSync(componentsPath).filter(isComponentFolder);
  };
};
