module.exports = (deps) => {
  return function getTestingMarkup(req, res) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup
    } = deps;
    const { componentsContext, locale } = req;
    const componentName = req.componentPath.slice(1);
    const context = { locale, ...componentsContext };
    const renderedComponent = renderComponent({componentName, context}, renderTestMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  };
};
