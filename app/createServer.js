module.exports = (deps) => {
  return function createServer() {
    const {
      'express': express,
      'express-domain-middleware': domainMiddleware,
      '/routes/index': getRoutes,
      'node-hook': hook,
      '/middleware/errorHandler': errorHandler,
      '/middleware/logRequests': logRequests,
      compression
    } = deps;
    const app = express();

    hook.hook('.scss', () => {});
    app.set('Accept-Encoding', 'gzip');
    app.use(logRequests); //be first to ensure all requests are logged
    app.use(compression());
    app.use(domainMiddleware);
    app.use(getRoutes());
    app.use('/public', express.static('public'));
    app.use(errorHandler);

    return app;
  };
};
