module.exports = (deps) => {
  return function renderComponent({componentName, componentsContext}, cb) {
    const {
      'toga-component': {renderReact}
    } = deps;
    const component = require(`../../components/${componentName}/`);
    const renderedComponent = renderReact({component, componentName, context: componentsContext});

    return cb({
      componentDOM: renderedComponent,
      componentName,
      context: componentsContext
    });
  };
};
