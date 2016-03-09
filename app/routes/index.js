module.exports = (deps) => {
  return function getRoutes() {
    const {
      'express': express,
      '/routes/serverStatus/index': createServerStatusRouter,
      '/routes/public/index': createPublicRouter,
      '/routes/components/index': createComponentsRouter,
      '/lib/getAppConfig': getAppConfig
      } = deps;
    const apiVersion = getAppConfig().apiVersion;
    const appRouter = express.Router();

    appRouter.use(createServerStatusRouter());
    appRouter.use(createPublicRouter());
    appRouter.use(`/v${apiVersion}`, createComponentsRouter());

    return appRouter;
  };
};
