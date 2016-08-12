module.exports = (deps) => {
  return function renderComponent({ componentName, props }) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/config/index': config,
      '/lib/utils/errors': { NotFoundError, InternalServerError },
      '/lib/utils/pathsExist': pathsExist,
      '/lib/utils/componentHelper': componentHelper,
      debug,
      path
    } = deps;
    const log = debug('toga:renderComponent');
    const { componentsPath } = config;
    const relativeComponentPath = path.join('../../', componentsPath, componentName);

    function getComponent(component) {
      try {
        return require(`${component}/`);
      }
      catch(e) {
        log(e);
        throw new InternalServerError(`${componentName} Parsing error`);
      }
    }

    return pathsExist(componentHelper.path(componentName))
      .then((exists) => {
        if (exists) {
          const component = getComponent(relativeComponentPath);
          const componentDOM = ReactDOMServer.renderToString(
            // handle export default as well as module.exports
            React.createElement(component.default || component, props)
          );
          return { componentDOM, componentName, props };
        }
        else {
          throw new NotFoundError(`${componentName} not found`);
        }
      });
  };
};
