const React = require('react');
const ReactDomServer = require('react-dom/server');
const Component = require('./HellowWorld');

module.exports = function render(locals) {
  const html = ReactDomServer.renderToString(
    React.createElement(Component.default || Component, locals)
  );
  return Promise.resolve('<!DOCTYPE html>' + JSON.stringify(locals.assets) +  html)
};
