const bundles = require(process.cwd() + '/dist/components/asset-bundles.json');

module.exports = (deps) => {
  return function getRawComponentHtml(req, res, next) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup,
      '/views/component-raw': renderRawMarkup
    } = deps;
    const { props, raw, preview, componentName } = req;
    if (!raw && !preview) {
      next();
      return Promise.resolve();
    }
    const renderer = raw ? renderRawMarkup : renderTestMarkup;
    return renderComponent({ componentName, props })
      .then((opts) => {
        const html = renderer({ ...opts, bundles });
        res.set('Content-Type', 'text/html');
        res.send(html);
      })
      .catch((err) => {
        next(err);
      });
  };
};
