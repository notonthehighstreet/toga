const ReactDOMServer = require('react-dom/server');
const React = require('react');
const wrapComponent = require('./wrapComponent');

module.exports = ({component, context, componentName}) => {
  const TogaComponent = wrapComponent(component, componentName);

  return ReactDOMServer.renderToString(React.createElement(TogaComponent, context));
};
