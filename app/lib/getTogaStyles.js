module.exports = (deps) => {
  return function getTogaStyles() {
    const {
      'es6-promisify': promisify,
      'fs': fs,
      'request-promise': request,
      '/lib/getAppConfig': getAppConfig,
      '/lib/cssBundler/compile': compileSCSS
      } = deps;

    const readFile = promisify(fs.readFile);
    const togaStylesPath = './public/styles/toga.scss';
    const concatCss = (cssContents) => {
      return cssContents.join('\n');
    };

    const config = getAppConfig();
    const getTogaCss = readFile(togaStylesPath);
    const getToolkitStyles = request.get(config.stylesToolkit.url);

    return Promise.all([
      getTogaCss,
      getToolkitStyles
    ]).then((cssContents) => {
      return compileSCSS({
        stylesheetContent: concatCss(cssContents),
        includePaths: ['./public/styles']
      });
    });
  };
};
