module.exports = (deps) => {
  return function getComponentBundle(req, res, next) {
    const {
      '/lib/jsBundler/getComponentBundle': getComponentBundleContent
      } = deps;
    const options = {
      components: req.componentsContext,
      locale: req.locale || 'en'
    };

    getComponentBundleContent(options)
      .then(
        (bundleContent) => {
          res.set('Content-Type', 'application/javascript').send(bundleContent);
        },
        (error) => {
          next(error);
        }
      );
  };
};
