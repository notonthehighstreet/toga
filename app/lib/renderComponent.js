module.exports = (deps) => {
  return function renderComponent({componentName, context}) {
    const {
      'react-dom/server' : ReactDOMServer,
      'react' : React,
      '/lib/getAppConfig': getAppConfig,
      '/lib/utils/pathsExist': pathsExist,
      path
    } = deps;
    const {componentsPath} = getAppConfig();
    const relativeComponentPath = path.join('../../', componentsPath, componentName);
    return pathsExist(`${relativeComponentPath}/`).then(() => {
      const component = require(`${relativeComponentPath}/`);
      // handle export default as well as module.exports
      const componentDOM = ReactDOMServer.renderToString(
        React.createElement(component.default || component, context)
      );
      return {componentDOM, componentName, context};
    });
  };
};
