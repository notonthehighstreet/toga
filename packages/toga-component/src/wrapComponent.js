const React = require('react');

module.exports = (Component, componentName) => {
  return React.createClass({
    render() {
      const className = `toga-${componentName}`;

      return (
        <div className={className}>
          <Component/>
        </div>
      );
    }
  });
};
