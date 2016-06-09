module.exports = (deps) => {
  return function getRawComponentHtml(req, res) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-raw': renderRawMarkup
      } = deps;
    const { componentsContext : context } = req;
    const componentName = req.componentPath.slice(1);
    const renderedComponent = renderComponent({componentName, context}, renderRawMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  };
};
