module.exports = (deps) => {
  return function renderComponent({ componentName, props }) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/utils/errors': { InternalServerError },
      debug
    } = deps;
    const log = debug('toga:renderComponent');
    const component = getComponentInfo(componentName)[0];
    function requireComponent(componentPath) {
      try {
        return require(componentPath);
      }
      catch(e) {
        log(e);
        throw new InternalServerError(`${componentPath} require/Parsing error`);
      }
    }

    return Promise.resolve().then(() => {
      const componentJS = requireComponent(component.requirePath);
      const componentDOM = ReactDOMServer.renderToString(
            // handle export default as well as module.exports
            React.createElement(componentJS.default || componentJS, props)
          );
      return { componentDOM, componentName, props };
    });
  };
};
