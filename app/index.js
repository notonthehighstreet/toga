module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      '/createServer': createServer,
      '/lib/getComponentNames': getComponentNames,
      '/lib/universalRendering/index': getUniversalRendering,
      '/logger': getLogger,
      debug,
      path
    } = deps;

    const log = debug('toga:startup');
    const logger = getLogger();
    const components = getComponentNames();
    const universalRendering = getUniversalRendering();

    log(`${components.length} components`);

    return universalRendering.createAssetsJson(components)
      .then(() => {
        return universalRendering.server(path.join(__dirname, '..'));
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
