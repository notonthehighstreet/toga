module.exports = (deps) => {
  return function createComponentRouter() {
    const {
      'express': express,
      '/routes/components/html': createHtmlRouter,
      '/routes/components/styles': createStylesRouter,
      '/routes/components/js': createBundlingRouter,
      '/routes/components/manifest': createManifestRouter,
      '/routes/components/assets': createAssetsRouter,
      '/middleware/setComponentPath': setComponentPath,
      '/middleware/setLocale': setLocale
      } = deps;
    const router = express.Router();
    
    router.use(
      setLocale,
      setComponentPath,
      createHtmlRouter(),
      createStylesRouter(),
      createBundlingRouter(),
      createManifestRouter(),
      createAssetsRouter()
    );

    return router;
  };
};
