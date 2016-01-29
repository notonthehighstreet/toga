const preStartCache = require('../preStartCache');
const { getBundleComponent, preCacheComponentBundle, getBundleVendor } = require('../lib/jsBundler');
const contentTypeJS = 'application/javascript';

preStartCache.add(preCacheComponentBundle);

module.exports = {
  bundle: (req, res, next) => {
    const options = {
      locale: req.locale,
      componentName: req.componentPath.slice(1)
    };

    getBundleComponent(options)
      .then(
        (success) => {
          res.set('Content-Type', contentTypeJS).send(success.replace('%%%#${mountNodeId}%%%', `#comp-${req.mountNodeId}`));
        },
        (error) => {
          next(error);
        }
      );
  },
  vendorBundle: (req, res, next) => {
    const componentNames = req.query.components || [];

    getBundleVendor({componentNames})
      .then(
        (success) => {
          res.set('Content-Type', contentTypeJS).send(success);
        },
        (error) => {
          next(error);
        }
      );
  }
};
