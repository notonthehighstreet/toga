module.exports = (deps) => {
  return function createServer() {
    const {
      'express': express,
      'express-domain-middleware': domainMiddleware,
      'node-hook': hook,
      'svg-inline-loader': SvgLoader,
      '/routes/index': getRoutes,
      '/middleware/errorHandler': errorHandler,
      '/middleware/logRequests': logRequests,
      '/middleware/etagCache': etagCache,
      'response-time': responseTime,
      compression
    } = deps;
    const app = express();

    app.use(etagCache.setETagHeader);
    app.use(responseTime());
    hook.hook('.scss', () => {});
    hook.hook('.svg', (source) => {
      const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
      return 'module.exports = ' + JSON.stringify(markup);
    });
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
