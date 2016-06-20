module.exports = (deps) => {
  return function getRawComponentHtml(req, res) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-raw': renderRawMarkup
    } = deps;
    const { componentContext, locale } = req;
    const componentName = req.componentPath.slice(1);
    const context = { locale, ...componentContext };
    const renderedComponent = renderComponent({componentName, context}, renderRawMarkup);

    res.set('Content-Type', 'text/html').send(renderedComponent);
  };
};
