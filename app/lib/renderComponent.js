module.exports = (deps) => {
  return function renderComponent({componentName, context}) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/lib/getAppConfig': getAppConfig,
      '/lib/utils/pathsExist': pathsExist,
      '/lib/utils/createModulePaths': createModulePaths,
      path
    } = deps;
    const {componentsPath} = getAppConfig();
    return pathsExist(createModulePaths(componentName)).then(() => {
      const relativeComponentPath = path.join('../../', componentsPath, componentName);
      const component = require(`${relativeComponentPath}/`);
      // handle export default as well as module.exports
      const componentDOM = ReactDOMServer.renderToString(
        React.createElement(component.default || component, context)
      );
      return {componentDOM, componentName, context};
    });
  };
};
