module.exports = (deps) => {
  return function renderComponent({ componentName, props }) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/utils/errors': { NotFoundError, InternalServerError },
      '/lib/utils/pathsExist': pathsExist,
      debug
    } = deps;
    const log = debug('toga:renderComponent');
    const componentInfo = getComponentInfo(componentName);
    function requireComponent(componentPath) {
      try {
        return require(componentPath);
      }
      catch(e) {
        log(e);
        throw new InternalServerError(`${componentPath} require/Parsing error`);
      }
    }

    return pathsExist(componentInfo.file)
      .then((exists) => {
        if (exists) {
          const component = requireComponent(componentInfo.requirePath);
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
