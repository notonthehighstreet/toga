module.exports = (deps) => {
  return function getTogaStyles(req, res) {
    const {
      'es6-promisify': promisify,
      'fs': fs,
      'request-promise': request,
      '/lib/getAppConfig': getAppConfig,
      '/lib/cssBundler/compile': compile
      } = deps;
    const readFile = promisify(fs.readFile);
    const config = getAppConfig();
    const concatenateWithToolkitStyles = (additionalStyles) => {
      return request.get(config.stylesToolkit.url)
        .then((toolkitStyles) => {
          return `${toolkitStyles}${additionalStyles}`;
        });
    };

    readFile('./public/styles/toga.scss')
      .then(concatenateWithToolkitStyles)
      .then((scssContent) => {
        return compile({
          stylesheetContent: scssContent,
          includePaths: ['./public/styles']
        });
      })
      .then((cssContent) => {
        res.set('Content-Type', 'text/css').send(cssContent);
      });
  };
};
