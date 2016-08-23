module.exports = (deps) => {
  let allComponents = [];
  return function getComponentInfo(componentsToFind) {
    const {
      '/config/index': config,
      fs
    } = deps;
    const { components } = config;
    const root = components.path.replace('/./', '/');
    const componentToFindArr = Array.isArray(componentsToFind) ? componentsToFind : [componentsToFind];

    const getComponents = (componentNames) => {
      return allComponents.filter(component => componentNames.indexOf(component.name)>-1);
    };
    const isComponentFolder = ({ path, name, ignore }) => {
      return ignore.indexOf(name) < 0 && fs.statSync(`${path}/${name}`).isDirectory();
    };

    if (allComponents.length === 0) {
      allComponents = fs.readdirSync(root)
        .filter((name) => isComponentFolder({ path: root, name, ignore: components.ignore }))
        .map((name) => {
          return {
            name,
            root: './' + root,
            path: './' + root + '/' + name,
            file: './' + root + '/' + name + '/' + 'index.js',
            public: './' + root + '/' + name + '/' + components.public,
            requirePath: '../../' + root +'/'+ name + '/' + 'index.js',
          };
        });
    }
    return componentsToFind ? getComponents(componentToFindArr) : allComponents;
  };
};
