module.exports = (deps) => {
  return function getComponentNames() {
    const {
      '/lib/getAppConfig': getAppConfig,
      fs
    } = deps;
    const { componentsPath } = getAppConfig();

    const isComponentDir = (name) => fs.statSync(`${componentsPath}/${name}`).isDirectory();
    return fs.readdirSync(componentsPath).filter(isComponentDir);
  };
};
