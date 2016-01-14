const ReactDOMServer = require('react-dom/server');
const React = require('react');
const createT = require('./lib/createT');

module.exports = ({phrases, component}) => {
  const t = createT({phrases});

  return ReactDOMServer.renderToString(React.createElement(component, {t}));
};
