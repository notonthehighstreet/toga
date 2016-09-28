const contentType = {
  'js.map': 'application/json',
  'css.map': 'application/json',
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html'
};

module.exports = (deps) => {
  return function getComponentAsset(req, res, next) {
    const {
      '/lib/bundler/index': bundle
    } = deps;
    const { assetType, minify } = req;
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
