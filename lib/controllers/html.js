const path = require('path');
const promisify = require('es6-promisify');
const renderTestMarkup = require('../views/component-test');
const renderRawMarkup = require('../views/component-raw');
const componentsPath = '../../components';
const renderComponent = ({locale, componentPath, componentsContext}, cb) => {
  const renderModulePath = path.join(componentsPath, componentPath, 'render.js');
  const render = promisify(require(renderModulePath));

  return render({locale, componentsContext}).then((renderedComponent) => {
    return cb({
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

    renderComponent({locale, componentPath, componentsContext}, renderRawMarkup)
      .then((renderedComponent) => {
        res.set('Content-Type', 'text/html').send(renderedComponent);
      })
      .catch((err)=> {
        next(err);
      });
  },
  test: (req, res, next) => {
    const { locale, componentsContext } = req;
    const componentPath = req.componentPath.slice(1);

    renderComponent({locale, componentPath, componentsContext}, renderTestMarkup)
      .then((renderedComponent) => {
        res.set('Content-Type', 'text/html').send(renderedComponent);
      })
      .catch((err)=> {
        next(err);
      });
  }
};
