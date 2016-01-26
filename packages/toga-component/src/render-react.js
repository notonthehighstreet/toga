const ReactDOMServer = require('react-dom/server');
const React = require('react');

module.exports = ({component}) => {
  return ReactDOMServer.renderToString(React.createElement(component));
};
