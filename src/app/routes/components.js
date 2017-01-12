module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentProps': setComponentProps,
      '/middleware/getComponentHtml': getComponentHtml
    } = deps;
    const router = express.Router();
    const oneDay = 86400000;
    const MAP_URL = '/:components.(min\.)components.?(css|js).map';
    const HTML_URL = '/:componentName.(raw\.)?html';
    const ASSETS_URL = '/:componentName.(min\.)?(css|js)';

    router.use(MAP_URL, setComponentProps.map);
    router.use(ASSETS_URL, setComponentProps.asset);
    router.use(HTML_URL, setComponentProps.html);

    router.get(HTML_URL, getComponentHtml);

    router.use('/', express.static('dist/components/', { maxAge: oneDay * 365, etag: false }));

    return router;
  };
};
