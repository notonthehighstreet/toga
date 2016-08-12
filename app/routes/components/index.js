module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentProps': setComponentProps,
      '/middleware/getComponentAsset': getComponentAsset,
      '/middleware/getComponentHtml': getComponentHtml,
      '/config/index': config,
      '/middleware/setLocale': setLocale
    } = deps;

    const router = express.Router();
    const MAP_URL = '/:components.components(\.min)?.(css|js).map';
    const HTML_URL = '/:componentName.(raw\.)?html';
    const ASSETS_URL = '/:componentName.(min\.)?(css|js)';

    const serveStatic = (req, res, next) => {
      const { component, path } = req.params;
      return express.static(`components/${component}/assets/${path}`)(req, res, next);
    };

    router.use(setLocale);
    router.use(MAP_URL, setComponentProps.map);
    router.use(ASSETS_URL, setComponentProps.asset);
    router.use(HTML_URL, setComponentProps.html);

    router
      .get('/core(\.min)?.css', (req, res) => res.redirect(config.coreStyles.url))
      .get(HTML_URL, getComponentHtml)
      .get([MAP_URL, ASSETS_URL], getComponentAsset);

    router.use('/:component/assets/:path', serveStatic);

    return router;
  };
};
