module.exports = (deps) => {
  return function getVendorBundle(req, res, next) {
    const {
      '/logger': getLogger,
      '/lib/jsBundler/getVendorBundle': getVendorBundleContent
      } = deps;
    let componentNames;
    const logger = getLogger();

    try { // TODO extract reading components from query into separate middleware
      componentNames = JSON.parse(req.query.components);
    }
    catch (e) {
      logger.info('Failed to parse component names', req.query.components);
      componentNames = [];
    }
    logger.info('Vendor Bundle requested with components: ', componentNames);

    getVendorBundleContent({componentNames})
      .then(
        (bundleContent) => {
          logger.info('Vendor Bundle retreived for: ', componentNames);
          res.set('Content-Type', 'application/javascript').send(bundleContent);
        },
        (error) => {
          next(error);
        }
      );
  };
};
