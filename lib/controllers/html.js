const renderTestMarkup = require('../views/component-test');
const renderRawMarkup = require('../views/component-raw');
const renderReact = require('toga-component').renderReact;

const renderComponent = ({locale, componentName, componentsContext}, cb) => {
  const component = require(`../../components/${componentName}/`)({locale});
  const renderedComponent = renderReact({component, context: componentsContext});
  return cb({
    componentDOM: renderedComponent,
    componentName,
    locale,
    context: componentsContext
  });
};

module.exports = {
  raw: (req, res) => {
    const { componentsContext } = req;
    const componentName = req.componentPath.slice(1);
    const locale = req.locale;
    const renderedComponent = renderComponent({locale, componentName, componentsContext}, renderRawMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  },
  test: (req, res) => {
    const { componentsContext } = req;
    const componentName = req.componentPath.slice(1);
    const locale = req.locale;
    const renderedComponent = renderComponent({locale, componentName, componentsContext}, renderTestMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  }
};
