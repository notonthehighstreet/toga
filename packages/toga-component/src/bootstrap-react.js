const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');

module.exports = ({component, componentName}) => {
  const elems = document.querySelectorAll(`[toga=${componentName}]`);
  const Component = component;

  _.forEach(elems, (elem) => {
    let props;

    try {
      props = JSON.parse(elem.getAttribute('props'));
    }
    catch (e) {
      props = {};
    }
    elem.classList.add('toga-component');
    ReactDOM.render(<Component {...props}/>, elem);
  });
};
