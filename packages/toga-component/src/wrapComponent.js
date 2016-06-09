const React = require('react');

module.exports = (Component, componentName) => {
  return React.createClass({
    render() {
      const className = `whoopsies-${componentName}`;

      return (
        <div className={className} >
          <Component {...this.props}/>
        </div>
      );
    }
  });
};
