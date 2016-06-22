const contentType = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html'
};

module.exports = (deps) => {
  return function getComponentAsset(assetType, bundleType) { 
    return function(req, res, next) {
      const {
        '/lib/jsBundler/getComponentBundle': getComponentBundle,
        '/middleware/errors/notFoundError': NotFoundError
      } = deps;
  
      return getComponentBundle(req.components, bundleType, req.path.endsWith(`.min.${assetType}`))
        .then((bundle) => {
          res.set('Content-Type', contentType[assetType]).send(bundle);
        })
        .catch(() => {
          next(new NotFoundError(`${bundleType} ${assetType} is not found`));
        });
    };
  };
};
