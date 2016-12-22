module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentProps': setComponentProps,
      '/middleware/getComponentHtml': getComponentHtml,
      '/lib/getComponentInfo': getComponentInfo,
      '/config/index': getConfig,
      '/logger': getLogger,
      '/middleware/setLocale': setLocale
    } = deps;
    const config = getConfig();
    const logger = getLogger();
    const router = express.Router();
    const oneDay = 86400000;

    // to do: test this as it was in the wrong place!
    const MAP_URL = '/:components.(min\.)components.?(css|js).map';
    const HTML_URL = '/:componentName.(raw\.)?html';
    const ASSETS_URL = '/:componentName.(min\.)?(css|js)';

    const serveStatic = (req, res, next) => {
      const { component } = req.params;
      const staticPath = (getComponentInfo(component)[0])
        ? getComponentInfo(component)[0].public
        : logger.error({ params: req.params, components: getComponentInfo(component) }, `No ComponentInfo found: ${component}`);
      return express.static(staticPath, { maxAge: oneDay / 24 / 4 })(req, res, next); // 24 hours
    };

    router.use(setLocale);
    router.use(MAP_URL, setComponentProps.map);
    router.use(ASSETS_URL, setComponentProps.asset);
    router.use(HTML_URL, setComponentProps.html);

    router
      .get('/core(\.min)?.css', (req, res) => res.redirect(config.coreStyles))
      .get(HTML_URL, getComponentHtml);

    router.use('/:component/assets', serveStatic);
    router.use('/', express.static('dist/components/', { maxAge: oneDay * 365, etag: false }));

    return router;
  };
};
