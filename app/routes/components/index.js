const express = require('express');
const fs = require('fs');
const sass = require('node-sass');
const handlebars = require('handlebars');
const componentsHash = {
  '/footer/copyright': require('../../components/footer/copyright')
};
const buildPath = (url) => {
  return url.replace(/\.html|styles\.css|\/raw\.html/, '');
};
const getTemplate = (callback) => {
  fs.readFile('./app/components/component-wrapper.html.tpl', 'utf-8', (error, source) => {
    var template = handlebars.compile(source, {noEscape: true});
    callback(template);
  });
};
const router = express.Router();

router.get(/.*raw\.html$/, (req, res) => {
  const locale = res.locals.locale;
  const componentPath = buildPath(req.path);
  const component = componentsHash[componentPath];

  component.render({locale: locale}, (renderedComponent) => {
    res.send(renderedComponent);
  });
});
router.get(/.*\.html$/, (req, res) => {
  const locale = res.locals.locale;
  const componentPath = buildPath(req.path);
  const component = componentsHash[componentPath];

  component.render({locale: locale}, (renderedComponent) => {
    getTemplate((template) => {
      const renderedTemplate = template({
        componentDOM: renderedComponent,
        componentPath: componentPath
      });

      res.set('Content-Type', 'text/html');
      res.send(renderedTemplate);
    });
  });
});
router.get(/.*\.css$/, (req, res) => {
  const fileName = 'styles.scss';
  const componentsPath = './app/components';
  const scssPath = `${componentsPath}${buildPath(req.path)}/${fileName}`;
  const scssFile = fs.readFileSync(scssPath, 'utf-8');
  const parsed = sass.renderSync({
    data: scssFile
  });

  res.set('Content-Type', 'text/css').send(parsed.css); //TODO pipe css output into res
});

module.exports = router;
