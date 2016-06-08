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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93cmFwQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkOztBQUVBLE9BQU8sT0FBUCxHQUFpQixVQUFDLFNBQUQsRUFBWSxhQUFaLEVBQThCO0FBQzdDLFNBQU8sTUFBTSxXQUFOLENBQWtCO0FBQ3ZCLFVBRHVCLG9CQUNkO0FBQ1AsVUFBTSxzQkFBb0IsYUFBMUI7O0FBRUEsYUFDRTtBQUFBO1FBQUEsRUFBSyxXQUFXLFNBQWhCO1FBQ0Usb0JBQUMsU0FBRCxFQUFlLEtBQUssS0FBcEI7QUFERixPQURGO0FBS0Q7QUFUc0IsR0FBbEIsQ0FBUDtBQVdELENBWkQiLCJmaWxlIjoid3JhcENvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoQ29tcG9uZW50LCBjb21wb25lbnROYW1lKSA9PiB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gYHRvZ2EtJHtjb21wb25lbnROYW1lfWA7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnRoaXMucHJvcHN9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59O1xuIl19