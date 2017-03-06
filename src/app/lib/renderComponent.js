module.exports = (deps) => {
  return function renderComponent({ componentName, props }) {
    const {
      'react-dom/server' : ReactDOMServer,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/getComponentData': getComponentWithData,
      '/lib/utils/errors': { InternalServerError },
      debug
    } = deps;
    const log = debug('toga:renderComponent');
    const componentInfo = getComponentInfo(componentName)[0];
    function requireComponent(componentPath) {
      try {
        return require(componentPath);
      }
      catch(e) {
        log(e);
        throw new InternalServerError(`${componentPath} require/Parsing error`);
      }
    }

    return Promise.resolve(componentInfo.requirePath)
      .then(requireComponent)
      .then((component) => {
        return getComponentWithData({
          Component: component.default || component,
          props,
          componentPath: componentInfo.path
        });
      })
      .then(({ Component }) => {
        const componentDOM = ReactDOMServer.renderToString(Component);
        return { componentDOM, componentName, props };
      });
  };
};
