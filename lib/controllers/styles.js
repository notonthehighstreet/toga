const getStylesBundle = require('../lib/cssBundler/getStylesBundle');

module.exports = {
  scss: (req, res, next) => {
    const componentNames = req.componentsContext;

    getStylesBundle({componentNames}).then((styles) => {
      res.set('Content-Type', 'text/css').send(styles);
    }).catch((err) => {
      next(err);
    });
  }
};
