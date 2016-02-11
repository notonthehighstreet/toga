'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

module.exports = function (_ref) {
  var component = _ref.component;
  var componentName = _ref.componentName;

  var elems = document.querySelectorAll('[toga=' + componentName + ']');
  var Component = component;

  _.forEach(elems, function (elem) {
    var props = undefined;

    try {
      props = JSON.parse(elem.getAttribute('props'));
    } catch (e) {
      props = {};
    }
    elem.classList.add('toga-component');
    elem.classList.add('toga-' + componentName);
    ReactDOM.render(React.createElement(Component, props), elem);
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib290c3RyYXAtcmVhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQVI7QUFDTixJQUFNLFdBQVcsUUFBUSxXQUFSLENBQVg7QUFDTixJQUFNLElBQUksUUFBUSxRQUFSLENBQUo7O0FBRU4sT0FBTyxPQUFQLEdBQWlCLGdCQUFnQztNQUE5QiwyQkFBOEI7TUFBbkIsbUNBQW1COztBQUMvQyxNQUFNLFFBQVEsU0FBUyxnQkFBVCxZQUFtQyxtQkFBbkMsQ0FBUixDQUR5QztBQUUvQyxNQUFNLFlBQVksU0FBWixDQUZ5Qzs7QUFJL0MsSUFBRSxPQUFGLENBQVUsS0FBVixFQUFpQixVQUFDLElBQUQsRUFBVTtBQUN6QixRQUFJLGlCQUFKLENBRHlCOztBQUd6QixRQUFJO0FBQ0YsY0FBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBWCxDQUFSLENBREU7S0FBSixDQUdBLE9BQU8sQ0FBUCxFQUFVO0FBQ1IsY0FBUSxFQUFSLENBRFE7S0FBVjtBQUdBLFNBQUssU0FBTCxDQUFlLEdBQWYsbUJBVHlCO0FBVXpCLFNBQUssU0FBTCxDQUFlLEdBQWYsV0FBMkIsYUFBM0IsRUFWeUI7QUFXekIsYUFBUyxNQUFULENBQWdCLG9CQUFDLFNBQUQsRUFBZSxLQUFmLENBQWhCLEVBQXlDLElBQXpDLEVBWHlCO0dBQVYsQ0FBakIsQ0FKK0M7Q0FBaEMiLCJmaWxlIjoiYm9vdHN0cmFwLXJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoe2NvbXBvbmVudCwgY29tcG9uZW50TmFtZX0pID0+IHtcbiAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbdG9nYT0ke2NvbXBvbmVudE5hbWV9XWApO1xuICBjb25zdCBDb21wb25lbnQgPSBjb21wb25lbnQ7XG5cbiAgXy5mb3JFYWNoKGVsZW1zLCAoZWxlbSkgPT4ge1xuICAgIGxldCBwcm9wcztcblxuICAgIHRyeSB7XG4gICAgICBwcm9wcyA9IEpTT04ucGFyc2UoZWxlbS5nZXRBdHRyaWJ1dGUoJ3Byb3BzJykpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcHJvcHMgPSB7fTtcbiAgICB9XG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKGB0b2dhLWNvbXBvbmVudGApO1xuICAgIGVsZW0uY2xhc3NMaXN0LmFkZChgdG9nYS0ke2NvbXBvbmVudE5hbWV9YCk7XG4gICAgUmVhY3RET00ucmVuZGVyKDxDb21wb25lbnQgey4uLnByb3BzfS8+LCBlbGVtKTtcbiAgfSk7XG59O1xuIl19