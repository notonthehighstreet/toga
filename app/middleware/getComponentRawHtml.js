module.exports = (deps) => {
  return function getRawComponentHtml(req, res) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-raw': renderRawMarkup
      } = deps;
    const { componentsContext } = req;
    const componentName = req.componentPath.slice(1);
    const renderedComponent = renderComponent({componentName, componentsContext}, renderRawMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  };
};
