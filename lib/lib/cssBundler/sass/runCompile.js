const sass = require('node-sass');
const fs = require('fs');
const promisify = require('es6-promisify');
const readFile = promisify(fs.readFile);
const getComponentPath = (componentName) => {
  return `./components/${componentName}`;
};
const scopeSCSS = (scss, componentName) => {
  return `
    .toga-${componentName} {
      ${scss}
    }
  `;
};

module.exports = function runCompile({componentNames}) {
  let readScssFilesContents = componentNames.map((componentName) => {
    return readFile(`./components/${componentName}/styles.scss`, 'utf-8')
      .then((scssFileContent) => {
        return scopeSCSS(scssFileContent, componentName);
      });
  });

  return Promise.all(readScssFilesContents).then((wrappedSCSSFilesContents) => {
    const parsed = sass.renderSync({
      data: wrappedSCSSFilesContents.join('\n'),
      includePaths: componentNames
        .map(getComponentPath)
        .concat('node_modules')
    });
    return parsed.css;
  });
};
