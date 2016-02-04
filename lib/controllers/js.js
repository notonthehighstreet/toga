const getComponentBundle = require('../lib/jsBundler/getComponentBundle');
const getVendorBundle = require('../lib/jsBundler/getVendorBundle');
const contentTypeJS = 'application/javascript';

module.exports = {
  bundle: (req, res, next) => {
    const options = {
      locale: req.locale,
      componentName: req.componentPath.slice(1)
    };

    getComponentBundle(options)
      .then(
        (bundle) => {
          res.set('Content-Type', contentTypeJS).send(bundle.replace('%%%#${mountNodeId}%%%', `#comp-${req.mountNodeId}`));
        })
      .catch((error) => {
        next(error);
      });
  },
  vendorBundle: (req, res, next) => {
    const componentNames = req.query.components || [];

    getVendorBundle({componentNames})
      .then(
        (bundle) => {
          res.set('Content-Type', contentTypeJS).send(bundle);
        })
      .catch((error) => {
        next(error);
      });
  }
};
