module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      '/createServer': createServer,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/universalRendering/index': getUniversalRendering,
      '/logger': getLogger,
      debug,
      path
    } = deps;

    const log = debug('toga:startup');
    const logger = getLogger();
    const components = getComponentInfo();
    const universalRendering = getUniversalRendering();

    log(`${components.length} components`);

    return universalRendering.createAssetsJson(components)
      .then((repoRoot) => {
        return universalRendering.server(path.join(__dirname, '..'), repoRoot);
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
