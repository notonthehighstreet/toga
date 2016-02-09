const path = require('path');
const renderBundleMarkup = require('../views/component-bundle');
const promisify = require('es6-promisify');
const componentsPath = '../../components';
const renderRawComponent = ({locale, componentPath, componentsContext}) => {
  const renderModulePath = path.join(componentsPath, componentPath, 'render.js');
  const render = promisify(require(renderModulePath));

  return render({locale, componentsContext});
};
const renderBundledComponent = ({locale, componentPath, componentsContext}) => {
  return renderRawComponent({locale, componentPath, componentsContext}).then((renderedComponent) => {
    return renderBundleMarkup({
      componentDOM: renderedComponent,
      componentPath,
      locale,
      context: componentsContext
    });
  });
};

module.exports = {
  raw: (req, res, next) => {
    const { locale, componentsContext } = req;
    const componentPath = req.componentPath.slice(1);

    renderRawComponent({locale, componentPath, componentsContext})
      .then((renderedComponent) => {
        res.set('Content-Type', 'text/html').send(renderedComponent);
      })
      .catch((err)=> {
        next(err);
      });
  },
  bundle: (req, res, next) => {
    const { locale, componentsContext } = req;
    const componentPath = req.componentPath.slice(1);

    renderBundledComponent({locale, componentPath, componentsContext})
      .then((renderedComponent) => {
        res.set('Content-Type', 'text/html').send(renderedComponent);
      })
      .catch((err)=> {
        next(err);
      });
  }
};

