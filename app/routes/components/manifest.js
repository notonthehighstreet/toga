module.exports = (deps) => {
  return function createManifestRouter() {
    const {
      'express': express,
      '/middleware/getComponentManifest': getComponentManifest
      } = deps;
    const router = express.Router();

    router.get(/.*\.json$/,
      getComponentManifest
    );

    return router;
  };
};
