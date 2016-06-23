module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentContext': setComponentContext,
      '/middleware/getComponentAsset': getComponentAsset,
      '/middleware/getComponentHtml': getComponentHtml,
      '/middleware/setLocale': setLocale
    } = deps;

    const router = express.Router();

    const serveStatic = (req, res, next) => {
      const { component, path } = req.params;
      return express.static(`components/${component}/assets/${path}`)(req, res, next);
    };

    router.use(setLocale, setComponentContext);

    router
      .get(/^\/styles(\.min)?.css$/, getComponentAsset('css', 'styles'))
      .get(/^\/components(\.min)?\.js$/, getComponentAsset('js', 'scripts'))
      .get(/^\/components-vendor-bundle(\.min)?\.js$/, getComponentAsset('js', 'scripts'))
      .get(/.*\.(raw\.)?html$/, getComponentHtml);

    router.use('/:component/assets/:path', serveStatic);

    return router;
  };
};
