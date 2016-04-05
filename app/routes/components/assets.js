module.exports = (deps) => {
  return function createAssetsRouter() {
    const {
      'express': express
    } = deps;
    const router = express.Router();
    const serveStatic = (req, res, next) => {
      const { component, path } = req.params;

      return express.static(`components/${component}/assets/${path}`)(req, res, next);
    };

    router.use('/:component/assets/:path', serveStatic);

    return router;
  };
};
