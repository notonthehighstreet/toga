const fs = require('fs');
const promisify  = require('es6-promisify');
const request = require('request-promise');
const getStylesBundle = require('../lib/cssBundler/getStylesBundle');
const config = require('../../config/getAppConfig')();
const readFile = promisify(fs.readFile);
const compile = require('../lib/cssBundler/compile');
const concatenateWithToolkitStyles = (additionalStyles) => {
  return request.get(config.stylesToolkit.url)
    .then((toolkitStyles) => {
      return `${toolkitStyles}${additionalStyles}`;
    });
};

module.exports = {
  scss: (req, res, next) => {
    const componentNames = req.componentsContext;

    getStylesBundle({componentNames}).then((cssContent) => {
      res.set('Content-Type', 'text/css').send(cssContent);
    }).catch(next);
  },
  toga: (req, res) => {
    readFile('./public/styles/toga.scss')
      .then(concatenateWithToolkitStyles)
      .then((scssContent) => {
        return compile({
          stylesheetContent: scssContent,
          includePaths: ['./public/styles']
        });
      })
      .then((cssContent) => {
        res.set('Content-Type', 'text/css').send(cssContent);
      });
  }
};
