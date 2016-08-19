module.exports = (deps) => {
  return function getRawComponentHtml(req, res, next) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup,
      '/views/component-raw': renderRawMarkup,
      '/config/index': config
    } = deps;
    const { props, raw, componentName } = req;
    const renderer = raw ? renderRawMarkup : renderTestMarkup;
    return renderComponent({ componentName, props })
      .then((opts) => {
        const html = renderer({ ...opts, coreStyles: config.coreStyles.url });
        res.set('Content-Type', 'text/html');
        res.send(html);
      })
      .catch((err) => {
        next(err);
      });
  };
};

