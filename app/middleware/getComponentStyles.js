module.exports = (deps) => {
  return function getComponentStyles(req, res, next) {
    const {
      '/lib/cssBundler/getStylesBundle': getStylesBundle
      } = deps;
    const componentNames = req.componentsContext;

    getStylesBundle({componentNames}).then((cssContent) => {
      res.set('Content-Type', 'text/css').send(cssContent);
    }).catch(next);
  };
};
