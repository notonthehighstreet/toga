const promisify = require('es6-promisify');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const getComponentBundle = require('../../app/lib/jsBundler/getComponentBundle');

module.exports = function preCacheComponentBundle() {
  return readdir('./components')
    .then((components) => {
      const promises = components
        .filter((componentName) => fs.statSync(`./components/${componentName}`).isDirectory())
        .map((componentName) => getComponentBundle({components: [{name: componentName, locale: 'en'}]}));

      return Promise.all(promises);
    });
};
