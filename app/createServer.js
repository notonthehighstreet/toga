module.exports = (deps) => {
  return function createServer() {
    const {
      'express': express,
      'express-domain-middleware': domainMiddleware,
      '/routes/index': getRoutes,
      'node-hook': hook,
      '/middleware/errorHandler': errorHandler
    } = deps;
    const app = express();

    hook.hook('.scss', () => {});
    app.use(domainMiddleware);
    app.use(getRoutes());
    app.use('/public', express.static('public'));
    app.use(errorHandler);

    return app;
  };
};
