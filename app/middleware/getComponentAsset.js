const contentType = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html'
};

module.exports = (deps) => {
  return function getComponentAsset(assetType) {
    return function(req, res, next) {
      const {
        '/lib/bundler/index': bundle
      } = deps;

      const minify = req.path.endsWith(`.min.${assetType}`);

      return bundle(req.components, { minify })
        .getAsset(assetType)
        .then((content) => {
          res.set('Content-Type', contentType[assetType]).send(content);
        })
        .catch((err) => {
          next(err);
        });
    };
  };
};
