module.exports = (deps) => {
  return function getComponentStyles(req, res, next) {
    const {
      '/lib/getComponentStyleFromCache': getComponentStyleFromCache
      } = deps;
    const components = req.componentsContext;

    return getComponentStyleFromCache({components})
      .then((cssContent) => {
        res.set('Content-Type', 'text/css').send(cssContent);
      })
      .catch(next);
  };
};
