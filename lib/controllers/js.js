const getComponentBundle = require('../lib/jsBundler/getComponentBundle');
const getVendorBundle = require('../lib/jsBundler/getVendorBundle');
const contentTypeJS = 'application/javascript';
const logger = require('../lib/logger');

module.exports = {
  bundle: (req, res, next) => {
    const options = {
      components: req.componentsContext,
      locale: req.locale || 'en'
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
      logger.info('Failed to parse component names', req.query.components);
      componentNames = [];
    }
    logger.info('Vendor Bundle requested with components: ', componentNames);

    getVendorBundle({componentNames})
      .then(
        (bundleContent) => {
          logger.info('Vendor Bundle retreived for: ', componentNames);
          res.set('Content-Type', contentTypeJS).send(bundleContent);
        },
        (error) => {
          next(error);
        }
      );
  }
};
