module.exports = (deps) => {
  return function getVendorJs(req, res, next) {
    const {
      '/lib/jsBundler/getComponentBundle': getComponentBundle,
      '/middleware/errors/notFoundError': NotFoundError
      } = deps;

    return getComponentBundle(req.components, 'vendor')
      .then((bundle) => {
        res.set('Content-Type', 'application/javascript').send(bundle);
      })
      .catch(() => {
        next(new NotFoundError('Component is not found'));
      });
  };
};
