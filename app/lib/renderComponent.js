module.exports = (deps) => {
  return function renderComponent({componentName, context}, cb) {
    const {
      'toga-component': {renderReact}
    } = deps;
    const component = require(`../../components/${componentName}/`);
    const componentDOM = renderReact({component, componentName, context});

    return cb({ componentDOM, componentName, context });
  };
};
