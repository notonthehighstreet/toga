module.exports = (deps) => {
  return function getComponentJs(req, res, next) {
    const {
      '/lib/jsBundler/getComponentBundle': getComponentBundle,
      '/middleware/errors/notFoundError': NotFoundError
    } = deps;

    return getComponentBundle(req.components, 'component')
      .then((bundle) => {
        res.set('Content-Type', 'application/javascript').send(bundle);
      })
      .catch(() => {
        next(new NotFoundError('Component is not found'));
      });
  };
};
