module.exports = (deps) => {
  return function renderComponent({componentName, context}, cb) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/lib/getAppConfig': getAppConfig,
      path
    } = deps;
    const { componentsPath } = getAppConfig();
    const relativeComponentPath = path.join('../../', componentsPath, componentName);
    const component = require(`${relativeComponentPath}/`);
    // handle export default as well as module.exports
    const componentDOM =  ReactDOMServer.renderToString(
      React.createElement(component.default || component, context)
    );
    return cb({ componentDOM, componentName, context });
  };
};
