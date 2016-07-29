module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      '/createServer': createServer,
      '/lib/getComponentNames': getComponentNames,
      '/lib/createWebpackAssetsJson': createAssetsJson,
      '/lib/webpack/createIsoConfig': createIsoConfig,
      '/logger': getLogger,
      'webpack-isomorphic-tools': IsomorphicTools,
      debug,
      path
    } = deps;

    const log = debug('toga:startup');
    const logger = getLogger();
    const components = getComponentNames();
    const isoTools = new IsomorphicTools(createIsoConfig('.'));

    log(`${components.length} components`);

    return createAssetsJson(components)
      .then(() => {
        return isoTools.server(path.join(__dirname, '..'));
      })
      .then(() => {
        return new Promise((resolve) => {
          const server = createServer().listen(port, host, () => {
            resolve(server);
          });
        });
      })
      .catch((err) => {
        logger.error('Prevent server starting', err);
        process.exit(1);
      });
  };
};
