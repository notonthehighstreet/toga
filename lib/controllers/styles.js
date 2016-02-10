const getStylesBundle = require('../lib/cssBundler/getStylesBundle');

module.exports = {
  scss: (req, res, next) => {
    const components = req.componentsContext;

    getStylesBundle({components}).then((styles) => {
      res.set('Content-Type', 'text/css').send(styles);
    }).catch((err) => {
      next(err);
    });
  }
};
