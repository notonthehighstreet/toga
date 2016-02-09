const path = require('path');
const renderBundleMarkup = require('../views/component-bundle');
const componentsPath = '../../components';
const createRenderMiddleware = (renderer) => {
  return (req, res) => {
    const locale = req.locale;
    const componentPath = req.componentPath.slice(1);
    const renderModulePath = path.join(componentsPath, componentPath, 'render.js');
    const render = require(renderModulePath);
    const context = req.componentsContext;
    renderer({render, componentPath, locale, context}, (content) => {
      res.set('Content-Type', 'text/html').send(content);
    });
  };
};

module.exports = {
  raw: createRenderMiddleware(({render, locale, context}, cb) => {
    render({locale, context}, (renderedComponent) => {
      cb(renderedComponent);
    });
  }),
  bundle: createRenderMiddleware(({render, locale, componentPath, context}, cb) => {
    render({locale, context}, (renderedComponent) => {
      cb(renderBundleMarkup({
        componentDOM: renderedComponent,
        componentPath,
        locale,
        context
      }));
    });
  })
};
