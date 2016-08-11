module.exports = (deps) => {
  return function getComponentNames() {
    const {
      '/config/index': config,
      fs
    } = deps;
    const { componentsPath } = config;

    const isComponentDir = (name) => fs.statSync(`${componentsPath}/${name}`).isDirectory();
    return fs.readdirSync(componentsPath).filter(isComponentDir);
  };
};
