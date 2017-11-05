const bundles = require(process.cwd() + '/dist/components/asset-bundles.json');

module.exports = (deps) => {
  const {
    '/lib/renderComponent': renderComponent,
    '/views/component-test': renderTestMarkup,
    '/views/component-raw': renderRawMarkup
  } = deps;

  return {
    componentProps(req, res, next) {
      const { props, raw, preview, componentName } = req;
      if (!raw && !preview) {
        next();
        return Promise.resolve();
      }
      const renderer = raw ? renderRawMarkup : renderTestMarkup;
      return renderComponent({ url: req.url, componentName, componentData: { props } })
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
      const { raw, componentName } = req;
      if (!raw) {
        next();
        return Promise.resolve();
      }
      return renderComponent({ url: req.url, componentName, componentData: { data: req.body } })
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