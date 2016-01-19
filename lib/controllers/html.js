const path = require('path');
const renderBundleMarkup = require('../views/component-bundle');
const componentsPath = '../../components';
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
      cb(renderBundleMarkup({
        componentDOM: renderedComponent,
        componentPath,
        scopeId,
        locale
      }));
    });
  })
};
