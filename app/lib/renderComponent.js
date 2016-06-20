module.exports = (deps) => {
  return function renderComponent({componentName, context}, cb) {
    const {
      'toga-component': {renderReact},
      '/lib/getAppConfig': getAppConfig,
      path
    } = deps;
    const { componentsPath } = getAppConfig();
    const relativeComponentPath = path.join('../../', componentsPath, componentName);
    const component = require(`${relativeComponentPath}/`);
    const componentDOM = renderReact({component, context});

    return cb({ componentDOM, componentName, context });
  };
};
