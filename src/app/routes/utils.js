module.exports = (deps) => {
  return function createUtilsRouter() {
    const {
      'express': express,
      '/middleware/getServerStatus': getServerStatus,
      '/middleware/primeUrls': primeUrls,
      '/middleware/getAssetBundles': getAssetBundles,
      '/middleware/corsPublic': corsPublic,
      } = deps;
    const router = express.Router();

    router.get('/health', primeUrls);
    router.get('/server-status', getServerStatus);
    router.get('/prime-urls', primeUrls);
    router.get('/asset-bundles', corsPublic, getAssetBundles);

    return router;
  };
};
