module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentContext': setComponentContext,
      '/middleware/getComponentAsset': getComponentAsset,
      '/middleware/getComponentHtml': getComponentHtml,
      '/config/index': config,
      '/middleware/setLocale': setLocale
    } = deps;

    const router = express.Router();
    const MAP_URL = '/:components.components(\.min)?.(css|js).map';
    const ASSETS_URL = '/components(-vendor-bundle)?(\.min)?.(css|js)';
    const HTML_URL = '/:componentName.(raw\.)?html';

    const serveStatic = (req, res, next) => {
      const { component, path } = req.params;
      return express.static(`components/${component}/assets/${path}`)(req, res, next);
    };

    router.use(setLocale);
    router.use(MAP_URL, setComponentContext.map);
    router.use(ASSETS_URL, setComponentContext.asset);
    router.use(HTML_URL, setComponentContext.html);

    router
      .get(MAP_URL, getComponentAsset)
      .get(ASSETS_URL, getComponentAsset)
      .get(HTML_URL, getComponentHtml)
      .get('/core(\.min)?.css', (req, res) => res.redirect(config.coreStyles.url));

    router.use('/:component/assets/:path', serveStatic);

    return router;
  };
};
