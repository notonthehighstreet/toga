module.exports = (deps) => {
  return function getRoutes() {
    const {
      'express': express,
      '/routes/serverStatus': createServerStatusRouter,
      '/routes/components': createComponentsRouter,
      '/config/index': getConfig
      } = deps;
    const config = getConfig();
    const apiVersion = config.apiVersion;
    const appRouter = express.Router();

    appRouter.get('/', (req, res) => res.redirect('/v1/HelloWorld.html'));
    appRouter.use(createServerStatusRouter());
    appRouter.use(`/v${apiVersion}`, createComponentsRouter());

    return appRouter;
  };
};
