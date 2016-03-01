'use strict';

var fs = require('fs');
var path = require('path');
var loaderUtils = require('loader-utils');
var bootstrapper = fs.readFileSync(path.join(__dirname, 'bootstrapper.js'));
var getComponentName = function getComponentName(componentPath) {
  var componentPathSegments = componentPath.split('/');

  return componentPathSegments.slice(-2, -1)[0];
};
var getEntryComponentName = function getEntryComponentName(entryComponentPath) {
  var entryComponentPathSegments = entryComponentPath.split('/');

  return entryComponentPathSegments.slice(2, 3)[0];
};

module.exports = function (source) {
  var componentName = undefined;
  var entryComponentName = undefined;
  var isComponentNested = undefined;
  var togaComponentSource = source;

  this.value = togaComponentSource;
  this.cacheable && this.cacheable();
  try {
    componentName = getComponentName(loaderUtils.getRemainingRequest(this));
    entryComponentName = getEntryComponentName(this.options.entry.components[0]);
  } catch (e) {
    return source;
  }
  isComponentNested = entryComponentName !== componentName;
  if (typeof source === 'string' && !isComponentNested) {
    try {
      togaComponentSource = '\n        ' + source.replace('module.exports', 'let togaComponentSource') + '\n        let togaComponentName="' + entryComponentName + '";\n        ' + bootstrapper.toString() + '\n      ';
    } catch (e) {
      return source;
    }
  }
  this.value = togaComponentSource;

  return togaComponentSource;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sS0FBSyxRQUFRLElBQVIsQ0FBTDtBQUNOLElBQU0sT0FBTyxRQUFRLE1BQVIsQ0FBUDtBQUNOLElBQU0sY0FBYyxRQUFRLGNBQVIsQ0FBZDtBQUNOLElBQU0sZUFBZSxHQUFHLFlBQUgsQ0FBZ0IsS0FBSyxJQUFMLENBQVUsU0FBVixFQUFxQixpQkFBckIsQ0FBaEIsQ0FBZjtBQUNOLElBQU0sbUJBQW1CLFNBQW5CLGdCQUFtQixDQUFDLGFBQUQsRUFBbUI7QUFDMUMsTUFBTSx3QkFBd0IsY0FBYyxLQUFkLENBQW9CLEdBQXBCLENBQXhCLENBRG9DOztBQUcxQyxTQUFPLHNCQUFzQixLQUF0QixDQUE0QixDQUFDLENBQUQsRUFBSSxDQUFDLENBQUQsQ0FBaEMsQ0FBb0MsQ0FBcEMsQ0FBUCxDQUgwQztDQUFuQjtBQUt6QixJQUFNLHdCQUF3QixTQUF4QixxQkFBd0IsQ0FBQyxrQkFBRCxFQUF3QjtBQUNwRCxNQUFNLDZCQUE2QixtQkFBbUIsS0FBbkIsQ0FBeUIsR0FBekIsQ0FBN0IsQ0FEOEM7O0FBR3BELFNBQU8sMkJBQTJCLEtBQTNCLENBQWlDLENBQWpDLEVBQW9DLENBQXBDLEVBQXVDLENBQXZDLENBQVAsQ0FIb0Q7Q0FBeEI7O0FBTTlCLE9BQU8sT0FBUCxHQUFpQixVQUFTLE1BQVQsRUFBaUI7QUFDaEMsTUFBSSx5QkFBSixDQURnQztBQUVoQyxNQUFJLDhCQUFKLENBRmdDO0FBR2hDLE1BQUksNkJBQUosQ0FIZ0M7QUFJaEMsTUFBSSxzQkFBc0IsTUFBdEIsQ0FKNEI7O0FBTWhDLE9BQUssS0FBTCxHQUFhLG1CQUFiLENBTmdDO0FBT2hDLE9BQUssU0FBTCxJQUFrQixLQUFLLFNBQUwsRUFBbEIsQ0FQZ0M7QUFRaEMsTUFBSTtBQUNGLG9CQUFnQixpQkFBaUIsWUFBWSxtQkFBWixDQUFnQyxJQUFoQyxDQUFqQixDQUFoQixDQURFO0FBRUYseUJBQXFCLHNCQUFzQixLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFVBQW5CLENBQThCLENBQTlCLENBQXRCLENBQXJCLENBRkU7R0FBSixDQUlBLE9BQU8sQ0FBUCxFQUFVO0FBQ1IsV0FBTyxNQUFQLENBRFE7R0FBVjtBQUdBLHNCQUFvQix1QkFBdUIsYUFBdkIsQ0FmWTtBQWdCaEMsTUFBSSxPQUFPLE1BQVAsS0FBa0IsUUFBbEIsSUFBOEIsQ0FBQyxpQkFBRCxFQUFvQjtBQUNwRCxRQUFJO0FBQ0YsMkNBQ0ksT0FBTyxPQUFQLENBQWUsZ0JBQWYsRUFBaUMseUJBQWpDLDBDQUN3QixzQ0FDeEIsYUFBYSxRQUFiLGVBSEosQ0FERTtLQUFKLENBT0EsT0FBTyxDQUFQLEVBQVU7QUFDUixhQUFPLE1BQVAsQ0FEUTtLQUFWO0dBUkY7QUFZQSxPQUFLLEtBQUwsR0FBYSxtQkFBYixDQTVCZ0M7O0FBOEJoQyxTQUFPLG1CQUFQLENBOUJnQztDQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBsb2FkZXJVdGlscyA9IHJlcXVpcmUoJ2xvYWRlci11dGlscycpO1xuY29uc3QgYm9vdHN0cmFwcGVyID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICdib290c3RyYXBwZXIuanMnKSk7XG5jb25zdCBnZXRDb21wb25lbnROYW1lID0gKGNvbXBvbmVudFBhdGgpID0+IHtcbiAgY29uc3QgY29tcG9uZW50UGF0aFNlZ21lbnRzID0gY29tcG9uZW50UGF0aC5zcGxpdCgnLycpO1xuXG4gIHJldHVybiBjb21wb25lbnRQYXRoU2VnbWVudHMuc2xpY2UoLTIsIC0xKVswXTtcbn07XG5jb25zdCBnZXRFbnRyeUNvbXBvbmVudE5hbWUgPSAoZW50cnlDb21wb25lbnRQYXRoKSA9PiB7XG4gIGNvbnN0IGVudHJ5Q29tcG9uZW50UGF0aFNlZ21lbnRzID0gZW50cnlDb21wb25lbnRQYXRoLnNwbGl0KCcvJyk7XG5cbiAgcmV0dXJuIGVudHJ5Q29tcG9uZW50UGF0aFNlZ21lbnRzLnNsaWNlKDIsIDMpWzBdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzb3VyY2UpIHtcbiAgbGV0IGNvbXBvbmVudE5hbWU7XG4gIGxldCBlbnRyeUNvbXBvbmVudE5hbWU7XG4gIGxldCBpc0NvbXBvbmVudE5lc3RlZDtcbiAgbGV0IHRvZ2FDb21wb25lbnRTb3VyY2UgPSBzb3VyY2U7XG5cbiAgdGhpcy52YWx1ZSA9IHRvZ2FDb21wb25lbnRTb3VyY2U7XG4gIHRoaXMuY2FjaGVhYmxlICYmIHRoaXMuY2FjaGVhYmxlKCk7XG4gIHRyeSB7XG4gICAgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWUobG9hZGVyVXRpbHMuZ2V0UmVtYWluaW5nUmVxdWVzdCh0aGlzKSk7XG4gICAgZW50cnlDb21wb25lbnROYW1lID0gZ2V0RW50cnlDb21wb25lbnROYW1lKHRoaXMub3B0aW9ucy5lbnRyeS5jb21wb25lbnRzWzBdKTtcbiAgfVxuICBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgaXNDb21wb25lbnROZXN0ZWQgPSBlbnRyeUNvbXBvbmVudE5hbWUgIT09IGNvbXBvbmVudE5hbWU7XG4gIGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyAmJiAhaXNDb21wb25lbnROZXN0ZWQpIHtcbiAgICB0cnkge1xuICAgICAgdG9nYUNvbXBvbmVudFNvdXJjZSA9IGBcbiAgICAgICAgJHtzb3VyY2UucmVwbGFjZSgnbW9kdWxlLmV4cG9ydHMnLCAnbGV0IHRvZ2FDb21wb25lbnRTb3VyY2UnKX1cbiAgICAgICAgbGV0IHRvZ2FDb21wb25lbnROYW1lPVxcXCIke2VudHJ5Q29tcG9uZW50TmFtZX1cXFwiO1xuICAgICAgICAke2Jvb3RzdHJhcHBlci50b1N0cmluZygpfVxuICAgICAgYDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuICB9XG4gIHRoaXMudmFsdWUgPSB0b2dhQ29tcG9uZW50U291cmNlO1xuXG4gIHJldHVybiB0b2dhQ29tcG9uZW50U291cmNlO1xufTtcbiJdfQ==