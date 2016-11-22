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
      path,
      compression
    } = deps;
    const app = express();

    app.use(responseTime());
    hook.hook('.scss', () => {});
    hook.hook('.svg', (source) => {
      const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
      return 'module.exports = ' + JSON.stringify(markup);
    });
    app.set('Accept-Encoding', 'gzip');
    app.set('etag', etagCache.returnHash);
    app.use(function(req, res, next) {
      let maxAge;
      const minute = 120;
      const hour = minute * 60;
      const file = path.parse(req.originalUrl);

      switch (file.ext) {
        case '.html' : maxAge = minute * 15; break;
        case '.css' : maxAge = minute * 15; break;
        case '.js' : maxAge = minute * 15; break;
        default : maxAge = hour * 24;
      }
      res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
      next();
    });
    app.use(logRequests); //be first to ensure all requests are logged
    app.use(etagCache.etagRequest);
    app.use(compression());
    app.use(domainMiddleware);
    app.use(getRoutes());
    app.use('/public', express.static('public'));
    app.use(errorHandler);

    return app;
  };
};
