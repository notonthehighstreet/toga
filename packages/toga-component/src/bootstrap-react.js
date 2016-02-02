const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');

module.exports = ({component, componentName}) => {
  const elems = document.querySelectorAll('[toga=' + componentName + ']');

  _.forEach(elems, (elem) => {
    let prop;

    try {
      prop = JSON.parse(elem.getAttribute('prop'));
    }
    catch (e) {
      prop = {};
    }

    const reactElem = React.createElement(component, prop);

    ReactDOM.render(reactElem, elem);
  });
};
