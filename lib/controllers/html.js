const fs = require('fs');
const handlebars = require('handlebars');
const buildPath = (url) => {
  return url.replace(/\.html|\/raw\.html/, '');
};
const componentsHash = {
  '/footer/copyright': require('../../components/footer/copyright')
};
const getTemplate = (callback) => {
  fs.readFile('./components/component-wrapper.html.tpl', 'utf-8', (error, source) => {
    const template = handlebars.compile(source, {noEscape: true});

    callback(template);
  });
};

module.exports = {
  raw: (req, res) => {
    const locale = res.locals.locale;
    const componentPath = buildPath(req.path);
    const component = componentsHash[componentPath];

    component.render({locale: locale}, (renderedComponent) => {
      res.send(renderedComponent);
    });
  },
  bundle: (req, res) => {
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
  }
};
