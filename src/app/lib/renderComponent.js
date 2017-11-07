module.exports = (deps) => {
  return function renderComponent({ url, componentName, props }) {
    const {
      'react-dom/server' : ReactDOMServer,
      '/lib/components/require': requireComponent,
      '/lib/getComponentData': getComponentWithData,
    } = deps;

    return requireComponent(componentName)
      .then(({ component, path }) => {
        return getComponentWithData({
          url,
          Component: component.default || component,
          props,
          componentPath: path
        });
      })
      .then(({ Component, initialState }) => {
        const componentDOM = ReactDOMServer.renderToString(Component);
        return { componentDOM, componentName, props, initialState };
      });
  };
};
