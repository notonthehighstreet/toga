module.exports = (deps) => {
  return function getVendorBundle(req, res, next) {
    const {
      '/lib/getVendorBundleFromCache': getCachedVendorBundleContent,
      '/lib/jsBundler/getVendorBundle': getVendorBundleContent
      } = deps;
    return getCachedVendorBundleContent({componentNames: req.componentNames})
      .catch(() => {
        return getVendorBundleContent({componentNames: req.componentNames});
      })
      .then((bundleContent) => {
        res.set('Content-Type', 'application/javascript').send(bundleContent);
      })
      .catch(next);
  };
};
