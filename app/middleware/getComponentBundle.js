module.exports = (deps) => {
  return function getComponentBundle(req, res, next) {
    const {
      '/lib/jsBundler/getComponentBundle': getComponentBundleContent,
      '/lib/getComponentBundleFromCache': getCachedComponentBundleContent,
      '/middleware/errors/notFoundError': NotFoundError
    } = deps;
    const options = {
      components: req.componentsContext,
      locale: req.locale || 'en'
    };

    return getCachedComponentBundleContent(options)
      .catch(() => getComponentBundleContent(options))
      .then((bundleContent) => {
        res.set('Content-Type', 'application/javascript').send(bundleContent);
      })
      .catch(() => {
        next(new NotFoundError('Component is not found'));
      });
  };
};
