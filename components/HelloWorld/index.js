const React = require('react');
const ReactDomServer = require('react-dom/server');
const Component = require('./HellowWorld');

module.exports = function render(locals) {
  const html = ReactDomServer.renderToString(<Component {...locals} />);
  return Promise.resolve('<!DOCTYPE html>' + html)
};
