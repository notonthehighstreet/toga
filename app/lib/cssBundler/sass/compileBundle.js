module.exports = (deps) => {
  return function compileBundle({componentNames}) {
    const {
      'fs': fs,
      'es6-promisify': promisify,
      '/lib/cssBundler/sass/compile': compile
      } = deps;
    const readFile = promisify(fs.readFile);
    const getComponentPath = (componentName) => {
      return `./components/${componentName}`;
    };
    const scopeSCSS = (scss, componentName) => {
      return `.toga-${componentName} {
        ${scss}
      }`;
    };
    let readScssFilesContents = componentNames.map((componentName) => {
      return readFile(`./components/${componentName}/styles.scss`, 'utf-8')
        .then((scssFileContent) => {
          return scopeSCSS(scssFileContent, componentName);
        });
    });

    return Promise.all(readScssFilesContents)
      .then((wrappedSCSSFilesContents) => {
        return compile({
          stylesheetContent: wrappedSCSSFilesContents.join('\n'),
          includePaths: componentNames
            .map(getComponentPath)
            .concat('node_modules')
        });
      });
  };
};
