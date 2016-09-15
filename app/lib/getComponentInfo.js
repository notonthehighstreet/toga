module.exports = (deps) => {
  let allComponents = [];
  return function getComponentInfo(componentsToFind) {
    const {
      '/config/index': config,
      fs
    } = deps;
    const { components: componentsConfig } = config;
    const root = componentsConfig.path;
    const componentToFindArr = Array.isArray(componentsToFind) ? componentsToFind : [componentsToFind];

    const getComponents = (componentNames) => {
      return allComponents.filter(component => componentNames.indexOf(component.name)>-1);
    };
    const isComponentFolder = ({ path, name, ignore }) => {
      return ignore.indexOf(name) < 0 && fs.statSync(`${path}/${name}`).isDirectory();
    };
    const replaceCurrentDir = (dir) => dir.replace(/\/.\//g, '/');

    if (allComponents.length === 0) {
      allComponents = fs.readdirSync(root)
        .filter((name) => isComponentFolder({ path: root, name, ignore: componentsConfig.ignore }))
        .map((name) => {
          return {
            name,
            root: replaceCurrentDir(root),
            path: replaceCurrentDir(root + '/' + name),
            file: replaceCurrentDir(root + '/' + name + '/' + 'index.js'),
            public: replaceCurrentDir(root + '/' + name + '/' + componentsConfig.public),
            requirePath: replaceCurrentDir(root +'/'+ name + '/' + 'index.js'),
          };
        });
    }
    return componentsToFind ? getComponents(componentToFindArr) : allComponents;
  };
};
