module.exports = (deps) => {
  return function createServerStatusRouter() {
    const {
      'express': express,
      '/middleware/getServerStatus': getServerStatus
      } = deps;
    const router = express.Router();

    router.get('/health', getServerStatus);

    return router;
  };
};
