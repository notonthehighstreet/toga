const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const bootstrapper = fs.readFileSync(path.join(__dirname, 'bootstrapper.js'));
const getComponentName = (componentPath) => {
  const componentPathSegments = componentPath.split('/');

  //return the second-to-last segment
  return componentPathSegments.slice(-2, -1)[0];
};
const getEntryComponentName = (entryComponentPath) => {
  const entryComponentPathSegments = entryComponentPath.split('/');

  //return the third segment
  return entryComponentPathSegments.slice(2, 3)[0];
};

module.exports = function(source) {
  let componentName;
  let entryComponentName;
  let componentIsNested;
  let togaComponentSource = source;

  this.value = togaComponentSource;
  this.cacheable && this.cacheable();
  try {
    componentName = getComponentName(loaderUtils.getRemainingRequest(this));
    entryComponentName = getEntryComponentName(this.options.entry.components[0]);
  }
  catch (e) {
    return source;
  }
  componentIsNested = entryComponentName !== componentName;
  if (typeof source === 'string' && !componentIsNested) {
    try {
      togaComponentSource = `${source.replace('module.exports', 'let togaComponentSource')}
        let togaComponentName=\"${entryComponentName}\";
        ${bootstrapper.toString()}`;
    }
    catch (e) {
      return source;
    }
  }
  this.value = togaComponentSource;

  return togaComponentSource;
};
