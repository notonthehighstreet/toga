const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const componentsPath = '../../components';
const getTemplate = (callback) => {
  fs.readFile('./components/component-wrapper.html.hbs', 'utf-8', (error, source) => {
    const template = handlebars.compile(source, {noEscape: true});

    callback(template);
  });
};
const createRenderMiddleware = (renderer) => {
  return (req, res) => {
    const locale = req.locale;
    const componentPath = req.componentPath;
    const renderModulePath = path.join(componentsPath, componentPath, 'render.js');
    const render = require(renderModulePath);
    const scopeId = req.scopeId;

    renderer({render, componentPath, locale, scopeId}, (content) => {
      res.set('Content-Type', 'text/html').send(content);
    });
  };
};

module.exports = {
  raw: createRenderMiddleware(({render, locale}, cb) => {
    render({locale}, (renderedComponent) => {
      cb(renderedComponent);
    });
  }),
  bundle: createRenderMiddleware(({render, locale, componentPath, scopeId}, cb) => {
    render({locale}, (renderedComponent) => {
      getTemplate((template) => {
        const renderedTemplate = template({
          componentDOM: renderedComponent,
          componentPath,
          scopeId,
          locale
        });

        cb(renderedTemplate);
      });
    });
  })
};
