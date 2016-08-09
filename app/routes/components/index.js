module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentContext': setComponentContext,
      '/middleware/getComponentAsset': getComponentAsset,
      '/middleware/getComponentHtml': getComponentHtml,
      '/lib/getAppConfig': getAppConfig,
      '/middleware/setLocale': setLocale
    } = deps;

    const router = express.Router();

    const serveStatic = (req, res, next) => {
      const { component, path } = req.params;
      return express.static(`components/${component}/assets/${path}`)(req, res, next);
    };

    router.use(setLocale, setComponentContext);

    router
      .get(/^\/core(\.min)?.css$/, (req, res) => res.redirect(getAppConfig().stylesToolkit.url))
      .get(/^\/styles(\.min)?.css$/, getComponentAsset('css'))
      .get('/:components.components.js.map', getComponentAsset('js.map'))
      .get('/:components.components.css.map', getComponentAsset('css.map'))
      .get(/^\/components(\.min)?\.js$/, getComponentAsset('js'))
      .get(/^\/components-vendor-bundle(\.min)?\.js$/, getComponentAsset('js'))
      .get(/.*\.(raw\.)?html$/, getComponentHtml);

    router.use('/:component/assets/:path', serveStatic);

    return router;
  };
};
