const getStylesBundle = require('../lib/cssBundler/getStylesBundle');
const request = require('request');
const config = require('../../config/appConfig');

module.exports = {
  scss: (req, res, next) => {
    const componentNames = req.componentsContext;

    getStylesBundle({componentNames}).then((cssContent) => {
      res.set('Content-Type', 'text/css').send(cssContent);
    }).catch(next);
  },
  toga: (req, res) => {
    res.set('Content-Type', 'text/css');
    request.get(config.stylesToolkit.url)
      .pipe(res);
  }
};
