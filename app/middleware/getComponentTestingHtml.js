module.exports = (deps) => {
  return function getTestingMarkup(req, res) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup
      } = deps;
    const { componentsContext: context } = req;
    const componentName = req.componentPath.slice(1);
    const renderedComponent = renderComponent({componentName, context}, renderTestMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  };
};
