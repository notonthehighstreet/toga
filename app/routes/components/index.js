module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentContext': setComponentContext,
      '/middleware/getVendorJs': getVendorJs,
      '/middleware/getComponentJs': getComponentJs,
      '/middleware/getComponentStyles': getComponentStyles,
      '/middleware/getComponentRawHtml': getComponentRawHtml,
      '/middleware/getComponentTestingHtml': getComponentTestingHtml,
      '/middleware/setLocale': setLocale
    } = deps;

    const router = express.Router();

    const serveStatic = (req, res, next) => {
      const { component, path } = req.params;
      return express.static(`components/${component}/assets/${path}`)(req, res, next);
    };

    router.use(
      setLocale,
      setComponentContext
    );

    router
      .get(/^\/styles.css$/, getComponentStyles)
      .get(/^\/components-vendor-bundle\.js$/, getVendorJs)
      .get(/.*\.raw\.html$/, getComponentRawHtml)
      .get(/.*\.html$/, getComponentTestingHtml)
      .get(/^\/components\.js$/, getComponentJs);

    router.use('/:component/assets/:path', serveStatic);

    return router;
  };
};
