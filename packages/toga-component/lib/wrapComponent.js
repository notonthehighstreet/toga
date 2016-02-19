'use strict';

var React = require('react');

module.exports = function (Component, componentName) {
  return React.createClass({
    render: function render() {
      var className = 'toga-' + componentName;

      return React.createElement(
        'div',
        { className: className },
        React.createElement(Component, this.props)
      );
    }
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93cmFwQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVOLE9BQU8sT0FBUCxHQUFpQixVQUFDLFNBQUQsRUFBWSxhQUFaLEVBQThCO0FBQzdDLFNBQU8sTUFBTSxXQUFOLENBQWtCO0FBQ3ZCLDhCQUFTO0FBQ1AsVUFBTSxzQkFBb0IsYUFBcEIsQ0FEQzs7QUFHUCxhQUNFOztVQUFLLFdBQVcsU0FBWCxFQUFMO1FBQ0Usb0JBQUMsU0FBRCxFQUFlLEtBQUssS0FBTCxDQURqQjtPQURGLENBSE87S0FEYztHQUFsQixDQUFQLENBRDZDO0NBQTlCIiwiZmlsZSI6IndyYXBDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKENvbXBvbmVudCwgY29tcG9uZW50TmFtZSkgPT4ge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGB0b2dhLSR7Y29tcG9uZW50TmFtZX1gO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi50aGlzLnByb3BzfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==