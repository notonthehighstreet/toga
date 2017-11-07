module.exports = (deps) => {
  return function renderComponentRaw({ url, componentName, props }) {
    const {
      'react-dom/server': ReactDOMServer,
      '/lib/components/require': requireComponent,
      '/lib/setComponentData': renderComponentWithData,
    } = deps;

    return requireComponent(componentName)
      .then(({ component }) =>  renderComponentWithData({ url, Component: component.default || component, props }))
      .then(({ Component, initialState }) => {
        const componentDOM = ReactDOMServer.renderToString(Component);
        return { componentDOM, componentName, props: {}, initialState };
      });
  };
};
