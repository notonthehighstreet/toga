module.exports = (deps) => {
  return function getTestingMarkup(req, res) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup
      } = deps;
    const { componentsContext } = req;
    const componentName = req.componentPath.slice(1);
    const locale = req.locale;
    const renderedComponent = renderComponent({locale, componentName, componentsContext}, renderTestMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  };
};
