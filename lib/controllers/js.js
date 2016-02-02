const getComponentBundle = require('../lib/jsBundler/getComponentBundle');
const getVendorBundle = require('../lib/jsBundler/getVendorBundle');
const contentTypeJS = 'application/javascript';

module.exports = {
  bundle: (req, res, next) => {
    const options = {
      components: req.componentsContext,
      locale: req.locale
    };

    getComponentBundle(options)
      .then(
        (bundleContent) => {
          res.set('Content-Type', contentTypeJS).send(bundleContent);
        },
        (error) => {
          next(error);
        }
      );
  },
  vendorBundle: (req, res, next) => {
    let componentNames;

    try {
      componentNames = JSON.parse(req.query.components);
    }
    catch (e) {
      componentNames = [];
    }

    getVendorBundle({componentNames})
      .then(
        (bundleContent) => {
          res.set('Content-Type', contentTypeJS).send(bundleContent);
        },
        (error) => {
          next(error);
        }
      );
  }
};
