module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/middleware/setComponentProps': setComponentProps,
      '/middleware/getComponentHtml': getComponentHtml
    } = deps;
    const router = express.Router();

    router.use('/:componentName.(raw\.|preview\.)?html', setComponentProps.html);
    router.get('/:componentName.(raw\.|preview\.)?html', getComponentHtml);

    // needed for dev
    router.use('/', express.static('dist/components/', { etag: false }));

    return router;
  };
};
