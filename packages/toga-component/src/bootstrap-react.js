const React = require('react');
const ReactDOM = require('react-dom');

module.exports = ({component, scopeId}) => {
  ReactDOM.render(
    React.createElement(component),
    document.querySelector(`#${scopeId}`)
  );
};
