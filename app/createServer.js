module.exports = (deps) => {
  return function createServer() {
    const {
      'express': express,
      'express-domain-middleware': domainMiddleware,
      'node-hook': hook,
      '/routes/index': getRoutes,
      '/middleware/errorHandler': errorHandler,
      '/middleware/logRequests': logRequests,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/bundler/buildHash': buildHash,
      compression
    } = deps;
    const app = express();

    const componentInfo = getComponentInfo(['vendor']);
    const hash = buildHash([componentInfo.root])

    hook.hook('.scss', () => {});
    app.set('Accept-Encoding', 'gzip');
    app.set('etag', () => hash);
    app.use(logRequests); //be first to ensure all requests are logged
    app.use((req, res, next) => {
      if(req.get('If-None-Match') === hash) {
        res.sendStatus(304)
      }
      else {
        next()
      }
    });
    app.use(compression());
    app.use(domainMiddleware);
    app.use(getRoutes());
    app.use('/public', express.static('public'));
    app.use(errorHandler);

    return app;
  };
};
