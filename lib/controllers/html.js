const path = require('path');
const renderBundleMarkup = require('../views/component-bundle');
const componentsPath = '../../components';
const createRenderMiddleware = (renderer) => {
  return (req, res) => {
    const locale = req.locale;
    const componentPath = req.componentPath.slice(1);
    const renderModulePath = path.join(componentsPath, componentPath, 'render.js');
    const render = require(renderModulePath);
    const mountNodeId = req.mountNodeId;

    renderer({render, componentPath, locale, mountNodeId}, (content) => {
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
  bundle: createRenderMiddleware(({render, locale, componentPath, mountNodeId}, cb) => {
    render({locale}, (renderedComponent) => {
      cb(renderBundleMarkup({
        componentDOM: renderedComponent,
        componentPath,
        mountNodeId,
        locale
      }));
    });
  })
};
