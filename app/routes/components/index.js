module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentProps': setComponentProps,
      '/middleware/getComponentAsset': getComponentAsset,
      '/middleware/getComponentHtml': getComponentHtml,
      '/lib/getComponentInfo': getComponentInfo,
      '/config/index': config,
      '/middleware/setLocale': setLocale
    } = deps;

    const router = express.Router();
    // todo: test this as it was in the wrong place!
    const MAP_URL = '/:components.(min\.)components.?(css|js).map';
    const HTML_URL = '/:componentName.(raw\.)?html';
    const ASSETS_URL = '/:componentName.(min\.)?(css|js)';

    const serveStatic = (req, res, next) => {
      const { component } = req.params;
      return express.static(`${getComponentInfo(component)[0].public}`)(req, res, next);
    };

    router.use(setLocale);
    router.use(MAP_URL, setComponentProps.map);
    router.use(ASSETS_URL, setComponentProps.asset);
    router.use(HTML_URL, setComponentProps.html);

    router
      .get('/core(\.min)?.css', (req, res) => res.redirect(config.coreStyles))
      .get(HTML_URL, getComponentHtml)
      .get([MAP_URL, ASSETS_URL], getComponentAsset);

    router.use('/:component/assets', serveStatic);

    return router;
  };
};
