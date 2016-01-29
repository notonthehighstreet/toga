const React = require('react');
const ReactDOM = require('react-dom');

module.exports = ({component}) => {
  ReactDOM.render(
    React.createElement(component),
    document.querySelector('%%%#${mountNodeId}%%%')
  );
};
