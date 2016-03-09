module.exports = (deps) => {
  const {
    'express': express
    } = deps;

  return function createPublicRouter() {
    const router = express.Router();

    router.use(express.static('public'));

    return router;
  };
};
