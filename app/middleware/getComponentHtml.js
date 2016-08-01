module.exports = (deps) => {
  return function getRawComponentHtml(req, res, next) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup,
      '/views/component-raw': renderRawMarkup,
      '/middleware/errors/index': { NotFoundError }
    } = deps;
    const { componentContext, locale, path, componentPath } = req;
    const isRaw = path.endsWith('.raw.html');
    const componentName = componentPath.slice(1);
    const context = { locale, ...componentContext };
    const renderer = isRaw ? renderRawMarkup : renderTestMarkup;
    return renderComponent({componentName, context})
      .then((opts) => {
        const html = renderer(opts);
        res.set('Content-Type', 'text/html').send(html);
      })
      .catch(() => {
        next(new NotFoundError(`${componentName} is not found`));
      });
  };
};
