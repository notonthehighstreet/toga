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
    ReactDOM.render(React.createElement(Component, props), elem);
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib290c3RyYXAtcmVhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQVI7QUFDTixJQUFNLFdBQVcsUUFBUSxXQUFSLENBQVg7QUFDTixJQUFNLElBQUksUUFBUSxRQUFSLENBQUo7O0FBRU4sT0FBTyxPQUFQLEdBQWlCLGdCQUFnQztNQUE5QiwyQkFBOEI7TUFBbkIsbUNBQW1COztBQUMvQyxNQUFNLFFBQVEsU0FBUyxnQkFBVCxZQUFtQyxtQkFBbkMsQ0FBUixDQUR5QztBQUUvQyxNQUFNLFlBQVksU0FBWixDQUZ5Qzs7QUFJL0MsSUFBRSxPQUFGLENBQVUsS0FBVixFQUFpQixVQUFDLElBQUQsRUFBVTtBQUN6QixRQUFJLGlCQUFKLENBRHlCOztBQUd6QixRQUFJO0FBQ0YsY0FBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBWCxDQUFSLENBREU7S0FBSixDQUdBLE9BQU8sQ0FBUCxFQUFVO0FBQ1IsY0FBUSxFQUFSLENBRFE7S0FBVjtBQUdBLFNBQUssU0FBTCxDQUFlLEdBQWYsbUJBVHlCO0FBVXpCLGFBQVMsTUFBVCxDQUFnQixvQkFBQyxTQUFELEVBQWUsS0FBZixDQUFoQixFQUF5QyxJQUF6QyxFQVZ5QjtHQUFWLENBQWpCLENBSitDO0NBQWhDIiwiZmlsZSI6ImJvb3RzdHJhcC1yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHtjb21wb25lbnQsIGNvbXBvbmVudE5hbWV9KSA9PiB7XG4gIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3RvZ2E9JHtjb21wb25lbnROYW1lfV1gKTtcbiAgY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50O1xuXG4gIF8uZm9yRWFjaChlbGVtcywgKGVsZW0pID0+IHtcbiAgICBsZXQgcHJvcHM7XG5cbiAgICB0cnkge1xuICAgICAgcHJvcHMgPSBKU09OLnBhcnNlKGVsZW0uZ2V0QXR0cmlidXRlKCdwcm9wcycpKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHByb3BzID0ge307XG4gICAgfVxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZChgdG9nYS1jb21wb25lbnRgKTtcbiAgICBSZWFjdERPTS5yZW5kZXIoPENvbXBvbmVudCB7Li4ucHJvcHN9Lz4sIGVsZW0pO1xuICB9KTtcbn07XG4iXX0=