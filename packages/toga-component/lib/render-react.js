'use strict';

var ReactDOMServer = require('react-dom/server');
var React = require('react');

module.exports = function (_ref) {
  var component = _ref.component;
  var context = _ref.context;

  return ReactDOMServer.renderToString(React.createElement(component, context));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXItcmVhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLGlCQUFpQixRQUFRLGtCQUFSLENBQWpCO0FBQ04sSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVOLE9BQU8sT0FBUCxHQUFpQixnQkFBMEI7TUFBeEIsMkJBQXdCO01BQWIsdUJBQWE7O0FBQ3pDLFNBQU8sZUFBZSxjQUFmLENBQThCLE1BQU0sYUFBTixDQUFvQixTQUFwQixFQUErQixPQUEvQixDQUE5QixDQUFQLENBRHlDO0NBQTFCIiwiZmlsZSI6InJlbmRlci1yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0RE9NU2VydmVyID0gcmVxdWlyZSgncmVhY3QtZG9tL3NlcnZlcicpO1xuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh7Y29tcG9uZW50LCBjb250ZXh0fSkgPT4ge1xuICByZXR1cm4gUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIGNvbnRleHQpKTtcbn07XG4iXX0=