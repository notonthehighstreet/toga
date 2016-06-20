module.exports = (deps) => {
  return function getComponentStyles(req, res, next) {
    const {
      '/lib/jsBundler/getComponentBundle': getComponentBundle,
      '/middleware/errors/notFoundError': NotFoundError
    } = deps;

    return getComponentBundle(req.components, 'styles')
      .then((cssContent) => {
        res.set('Content-Type', 'text/css').send(cssContent);
      })
      .catch(() => {
        next(new NotFoundError('Component is not found'));
      });
  };
};
