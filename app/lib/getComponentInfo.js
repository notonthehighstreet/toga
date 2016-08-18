module.exports = (deps) => {
  let allComponents = [];
  return function getComponentInfo(componentsToFind) {
    const {
      '/config/index': config,
      path,
      fs
    } = deps;
    const { components } = config;
    const flatternArray = (arr) => [].concat.apply([], arr);

    //todo     // todo : handle when componentsToFind is an array of names
    const componentToFind = Array.isArray(componentsToFind) ? componentsToFind[0] : componentsToFind;

    // todo : handle when componentName is an array of names
    const getComponent = (componentName) => {
      return allComponents.find(component => component.name === componentName)
    };
    const isComponentFolder = ({ path, name, ignore }) => {
      return ignore.indexOf(name) < 0 && fs.statSync(`${path}/${name}`).isDirectory();
    };

    const getInfo = (component) => {
      const isLocal = component.root.startsWith('.');
      const requirePrefix = (isLocal) ? '../../' : '';
      const requireRoot = component.root + '/' + component.path;
      const root = (isLocal) ? requireRoot : path.join('node_modules', requireRoot);
      return fs.readdirSync(root)
        .filter((name) => {
          return isComponentFolder({ path: root, name, ignore: component.ignore });
        })
        .map((name) => {
          return {
            name,
            root: './' + root,
            path: './' + root + '/' + name,
            file: './' + root + '/' + name + '/' + 'index.js',
            public: './' + root + '/' + name + '/' + component.public,
            requirePath: requirePrefix + requireRoot +'/'+ name + '/' + 'index.js',
          }
        });
    };

    if (allComponents.length === 0) {
      allComponents = flatternArray(components.map(component => getInfo(component)));
    }
    return componentToFind ? getComponent(componentToFind) : allComponents;
  };
};
