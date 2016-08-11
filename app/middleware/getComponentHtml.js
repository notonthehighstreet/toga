module.exports = (deps) => {
  return function getRawComponentHtml(req, res, next) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup,
      '/views/component-raw': renderRawMarkup
    } = deps;
    const { context, raw, componentName } = req;
    const renderer = raw ? renderRawMarkup : renderTestMarkup;
    return renderComponent({ componentName, context })
      .then((opts) => {
        const html = renderer(opts);
        res.set('Content-Type', 'text/html').send(html);
      })
      .catch((err) => {
        next(err);
      });
  };
};

