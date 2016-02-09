const sass = require('node-sass');
const fs = require('fs');
const promisify = require('es6-promisify');
const readFile = promisify(fs.readFile);

module.exports = function runCompile({components}) {
  let promises = components.map((componentName) => {
    return readFile(`./components/${componentName}/styles.scss`, 'utf-8');
  });

  return Promise.all(promises).then((scsses) => {
    const allSCSS = scsses.join('\n');
    const parsed = sass.renderSync({
      data: allSCSS
    });
    return parsed.css;
  });
};
