'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

module.exports = function (_ref) {
  var component = _ref.component;
  var componentName = _ref.componentName;

  var elems = document.querySelectorAll('[toga=' + componentName + ']');

  _.forEach(elems, function (elem) {
    var prop = undefined;

    try {
      prop = JSON.parse(elem.getAttribute('prop'));
    } catch (e) {
      prop = {};
    }

    var reactElem = React.createElement(component, prop);

    ReactDOM.render(reactElem, elem);
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib290c3RyYXAtcmVhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQVI7QUFDTixJQUFNLFdBQVcsUUFBUSxXQUFSLENBQVg7QUFDTixJQUFNLElBQUksUUFBUSxRQUFSLENBQUo7O0FBRU4sT0FBTyxPQUFQLEdBQWlCLGdCQUFnQztNQUE5QiwyQkFBOEI7TUFBbkIsbUNBQW1COztBQUMvQyxNQUFNLFFBQVEsU0FBUyxnQkFBVCxZQUFtQyxtQkFBbkMsQ0FBUixDQUR5Qzs7QUFHL0MsSUFBRSxPQUFGLENBQVUsS0FBVixFQUFpQixVQUFDLElBQUQsRUFBVTtBQUN6QixRQUFJLGdCQUFKLENBRHlCOztBQUd6QixRQUFJO0FBQ0YsYUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBWCxDQUFQLENBREU7S0FBSixDQUdBLE9BQU8sQ0FBUCxFQUFVO0FBQ1IsYUFBTyxFQUFQLENBRFE7S0FBVjs7QUFJQSxRQUFNLFlBQVksTUFBTSxhQUFOLENBQW9CLFNBQXBCLEVBQStCLElBQS9CLENBQVosQ0FWbUI7O0FBWXpCLGFBQVMsTUFBVCxDQUFnQixTQUFoQixFQUEyQixJQUEzQixFQVp5QjtHQUFWLENBQWpCLENBSCtDO0NBQWhDIiwiZmlsZSI6ImJvb3RzdHJhcC1yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHtjb21wb25lbnQsIGNvbXBvbmVudE5hbWV9KSA9PiB7XG4gIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3RvZ2E9JHtjb21wb25lbnROYW1lfV1gKTtcblxuICBfLmZvckVhY2goZWxlbXMsIChlbGVtKSA9PiB7XG4gICAgbGV0IHByb3A7XG5cbiAgICB0cnkge1xuICAgICAgcHJvcCA9IEpTT04ucGFyc2UoZWxlbS5nZXRBdHRyaWJ1dGUoJ3Byb3AnKSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBwcm9wID0ge307XG4gICAgfVxuXG4gICAgY29uc3QgcmVhY3RFbGVtID0gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3ApO1xuXG4gICAgUmVhY3RET00ucmVuZGVyKHJlYWN0RWxlbSwgZWxlbSk7XG4gIH0pO1xufTtcbiJdfQ==