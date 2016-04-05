module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/routes/components/html': createHtmlRouter,
      '/routes/components/styles': createStylesRouter,
      '/routes/components/js': createBundlingRouter,
      '/routes/components/manifest': createManifestRouter,
      '/middleware/setComponentPath': setComponentPath,
      '/middleware/setLocale': setLocale
      } = deps;
    const router = express.Router();
    const subRouters = [
      createHtmlRouter,
      createStylesRouter,
      createBundlingRouter,
      createManifestRouter
    ];

    router.use(
      setLocale,
      setComponentPath
    );
    subRouters.forEach(factory => router.use(factory()));

    return router;
  };
};
