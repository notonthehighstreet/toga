const bootstrap = require('./bootstrap');
const React = require('react');
const ReactDOM = require('react-dom');

module.exports = ({phrases, component, scopeId}) => {
  bootstrap({phrases}, ({t}) => {
    ReactDOM.render(
      React.createElement(component, {t}),
      document.querySelector(`#${scopeId}`));
  });
};
