module.exports = (deps) => {
  return function renderComponent({ componentName, context }) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/lib/getAppConfig': getAppConfig,
      '/lib/utils/errors': { NotFoundError, InternalServerError },
      '/lib/utils/pathsExist': pathsExist,
      '/lib/utils/createModulePaths': createModulePaths,
      path
    } = deps;
    const { componentsPath } = getAppConfig();
    const relativeComponentPath = path.join('../../', componentsPath, componentName);

    function getComponent(component) {
      try {
        return require(`${component}/`);
      }
      catch(e) {
        throw new InternalServerError(`${componentName} Parsing error`);
      }
    }

    return pathsExist(createModulePaths(componentName))
      .then((exists) => {
        if (exists) {
          const component = getComponent(relativeComponentPath);
          const componentDOM = ReactDOMServer.renderToString(
            // handle export default as well as module.exports
            React.createElement(component.default || component, context)
          );
          return { componentDOM, componentName, context };
        }
        else {
          throw new NotFoundError(`${componentName} not found`);
        }
      });
  };
};
