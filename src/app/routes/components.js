module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      'body-parser': bodyParser,
      '/middleware/setComponentProps': setComponentProps,
      '/middleware/RenderController': RenderController,
    } = deps;
    const router = express.Router();

    router.use('/:componentName.(raw\.|preview\.)?html', setComponentProps.html);
    router.get('/:componentName.(raw\.|preview\.)?html', (req, res, next) => new RenderController(req, res, next).render());

    router.use(bodyParser.json());
    router.post('/:componentName.raw.html', (req, res, next) => new RenderController(req, res, next).render(req.body));

    // needed for dev
    router.use('/', express.static('dist/components/', { etag: false }));

    return router;
  };
};
