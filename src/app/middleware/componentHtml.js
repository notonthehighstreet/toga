const bundles = require(process.cwd() + '/dist/components/asset-bundles.json');

module.exports = (deps) => {
  const {
    '/lib/renderComponent': renderComponent,
    '/lib/renderComponentRaw': renderComponentRaw,
    '/views/component-test': renderTestMarkup,
    '/views/component-raw': renderRawMarkup
  } = deps;

  return {
    componentProps(req, res, next) {
      const { url, props, raw, preview, componentName } = req;
      if (!raw && !preview) {
        next();
        return Promise.resolve();
      }
      const renderer = raw ? renderRawMarkup : renderTestMarkup;
      return renderComponent({ url, componentName, props })
        .then((opts) => {
          const html = renderer({ ...opts, bundles });
          res.set('Content-Type', 'text/html');
          res.send(html);
        })
        .catch((err) => {
          next(err);
        });
    },

    componentData(req, res, next) {
      const { url, body, raw, componentName } = req;
      if (!raw) {
        next();
        return Promise.resolve();
      }
      return renderComponentRaw({ componentName, props: body, url})
        .then((opts) => {
          const html = renderRawMarkup({ ...opts, bundles });
          res.set('Content-Type', 'text/html');
          res.send(html);
        })
        .catch((err) => {
          next(err);
        });
    }
  };
};
