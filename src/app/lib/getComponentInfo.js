let allComponents = [];
module.exports = (deps) => {
  return function getComponentInfo(componentsToFind) {
    const {
      '/config/index': getConfig,
      '/lib/utils/errors': { NotFoundError },
      fs
    } = deps;
    const config = getConfig();
    const { components: componentsConfig } = config;
    const root = componentsConfig.path;
    const base = componentsConfig.base;
    const componentToFindArr = Array.isArray(componentsToFind) ? componentsToFind : [componentsToFind];
    const replaceCurrentDir = (dir) => dir.replace(/\/.\//g, '/');

    const getComponents = (componentNames) => {
      const components = allComponents.filter(component => componentNames.indexOf(component.name)>-1);
      if (!components.length) {
        throw new NotFoundError(`${componentNames} not found`);
      }
      return components;
    };
    const isComponentFolder = ({ path, name, ignore = '' }) => {
      return ignore.indexOf(name) < 0 && fs.statSync(`${path}/${name}`).isDirectory();
    };

    const getAllComponents = () => {
      return fs.readdirSync(root)
          .filter((name) => isComponentFolder({ path: root, name, ignore: componentsConfig.ignore }))
          .map((name) => {
            return {
              name,
              base: replaceCurrentDir(base),
              root: replaceCurrentDir(root),
              path: replaceCurrentDir(root + '/' + name),
              file: replaceCurrentDir(root + '/' + name + '/' + 'index.js'),
              requirePath: replaceCurrentDir(root +'/'+ name + '/' + 'index.js'),
            };
          });
    };

    if (allComponents.length === 0) {
      allComponents = getAllComponents();
    }
    return componentsToFind ? getComponents(componentToFindArr) : allComponents;
  };
};
