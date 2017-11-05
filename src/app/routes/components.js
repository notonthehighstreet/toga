module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      'body-parser': bodyParser,
      '/middleware/setComponentProps': setComponentProps,
      '/middleware/componentHtml': componentHtml,
    } = deps;
    const router = express.Router();

    router.use('/:componentName.(raw\.|preview\.)?html', setComponentProps.html);
    router.get('/:componentName.(raw\.|preview\.)?html', componentHtml.componentProps);

    router.use(bodyParser.json());
    router.post('/:componentName.raw.html', componentHtml.componentData);

    // needed for dev
    router.use('/', express.static('dist/components/', { etag: false }));

    return router;
  };
};
