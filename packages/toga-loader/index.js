const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');
const bootstrapper = fs.readFileSync(path.join(__dirname, 'bootstrapper.js'));
const getComponentName = (componentPath) => {
  const componentPathSegments = componentPath.split('/');

  return componentPathSegments.slice(-2, -1)[0];
};
const getEntryComponentName = (entryComponentPath) => {
  const entryComponentPathSegments = entryComponentPath.split('/');

  return entryComponentPathSegments.slice(2, 3)[0];
};

module.exports = function(source) {
  let componentName;
  let entryComponentName;
  let isComponentNested;
  let bootstrappedComponentSource = source;

  this.value = bootstrappedComponentSource;
  this.cacheable && this.cacheable();
  try {
    componentName = getComponentName(loaderUtils.getRemainingRequest(this));
    entryComponentName = getEntryComponentName(this.options.entry.components[0]);
  }
  catch (e) {
    return source;
  }
  
  isComponentNested = entryComponentName !== componentName;
  if (typeof source === 'string' && !isComponentNested) {
    try {
      bootstrappedComponentSource = `
        ${source.replace('module.exports', 'let togaComponentSource')}
        let togaComponentName=\"${entryComponentName}\";
        ${bootstrapper.toString()}
      `;
    }
    catch (e) {
      return source;
    }
  }
  this.value = bootstrappedComponentSource;

  return bootstrappedComponentSource;
};
