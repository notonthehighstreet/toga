module.exports = (deps) => {
  return function renderComponent({locale, componentName, componentsContext}, cb) {
    const {
      'toga-component': {renderReact}
    } = deps;
    const component = require(`../../components/${componentName}/`)({locale});
    const renderedComponent = renderReact({component, componentName, context: componentsContext});

    return cb({
      componentDOM: renderedComponent,
      componentName,
      locale,
      context: componentsContext
    });
  };
};
