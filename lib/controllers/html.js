const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const crypto = require('crypto');
const buildPath = (url) => {
  return url.replace(/\.html|\/raw\.html/, '');
};
const componentsPath = '../../components';
const getTemplate = (callback) => {
  fs.readFile('./components/component-wrapper.html.tpl', 'utf-8', (error, source) => {
    const template = handlebars.compile(source, {noEscape: true});

    callback(template);
  });
};
const createRenderMiddleware = (renderer) => {
  return (req, res) => {
    const locale = res.locals.locale;
    const componentPath = buildPath(req.path);
    const componentModulePath = path.join(componentsPath, componentPath);
    const component = require(componentModulePath);
    const scopeId = req.scopeId || crypto.createHash('sha256').update(componentPath).digest('hex').slice(0, 8);

    renderer({component, componentPath, locale, scopeId}, (content) => {
      res.set('Content-Type', 'text/html').send(content);
    });
  };
};

module.exports = {
  raw: createRenderMiddleware(({component, locale}, cb) => {
    component.render({locale}, (renderedComponent) => {
      cb(renderedComponent);
    });
  }),
  bundle: createRenderMiddleware(({component, locale, componentPath, scopeId}, cb) => {
    component.render({locale}, (renderedComponent) => {
      getTemplate((template) => {
        const renderedTemplate = template({
          componentDOM: renderedComponent,
          componentPath,
          scopeId
        });

        cb(renderedTemplate);
      });
    });
  })
};
