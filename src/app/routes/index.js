module.exports = (deps) => {
  return function getRoutes() {
    const {
      'express': express,
      '/routes/utils': createUtilsRouter,
      '/routes/components': createComponentsRouter
      } = deps;
    const appRouter = express.Router();

    appRouter.get('/', (req, res) => res.redirect('/HelloWorld.preview.html'));
    appRouter.use(createUtilsRouter());
    appRouter.use('/', createComponentsRouter());

    return appRouter;
  };
};
