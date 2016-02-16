const fs = require('fs');
const promisify = require('es6-promisify');
const compile = require('./compile');
const readFile = promisify(fs.readFile);
const getComponentPath = (componentName) => {
  return `./components/${componentName}`;
};
//const scopeSCSS = (scss, componentName) => {
//  return `
//    .toga-${componentName} {
//      ${scss}
//    }
//  `;
//};

module.exports = function compileBundle({componentNames}) {
  let readScssFilesContents = componentNames.map((componentName) => {
    return readFile(`./components/${componentName}/styles.scss`, 'utf-8');
      //.then((scssFileContent) => {
      //  return scopeSCSS(scssFileContent, componentName);
      //});
  });

  return Promise.all(readScssFilesContents).then((wrappedSCSSFilesContents) => {
    return compile({
      stylesheetContent: wrappedSCSSFilesContents.join('\n'),
      includePaths: componentNames
        .map(getComponentPath)
        .concat('node_modules')
    });
  });
};
