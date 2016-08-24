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
    const component = getComponentInfo(componentName)[0];
    function componentExists() {
      const throwE = (()=> {
        throw new NotFoundError(`${componentName} not found`);
      });
      return new Promise((resolve, reject) => {
        return (component)
          ? resolve(component)
          : reject(throwE());
      });
    }
    function requireComponent(componentPath) {
      try {
        return require(componentPath);
      }
      catch(e) {
        log(e);
        throw new InternalServerError(`${componentPath} require/Parsing error`);
      }
    }

    return componentExists()
      .then(()=> pathsExist(component.file))
      .then((exists) => {
        if (exists) {
          const componentJS = requireComponent(component.requirePath);
          const componentDOM = ReactDOMServer.renderToString(
            // handle export default as well as module.exports
            React.createElement(componentJS.default || componentJS, props)
          );
          return { componentDOM, componentName, props };
        }
        else {
          throw new NotFoundError(`${componentName} not found`);
        }
      });
  };
};
