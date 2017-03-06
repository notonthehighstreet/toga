module.exports = (deps) => {
  return function renderComponent({ componentName, props }) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/getComponentData': getComponentData,
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
      .then((component) => getComponentData({
        Component: component.default || component,
        props,
        componentPath: componentInfo.requirePath
      }))
      .then(({ Component, initialState }) => {
        const componentDOM = ReactDOMServer.renderToString(
          React.createElement(Component)
        );
        return { componentDOM, componentName, props, initialState };
      });
  };
};
