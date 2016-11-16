module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      '/createServer': createServer,
      '/lib/getComponentInfo': getComponentInfo,
      '/logger': getLogger,
      debug
    } = deps;

    const log = debug('toga:startup');
    const logger = getLogger();
    const components = getComponentInfo();

    log(`${components.length} components`);

    return Promise.resolve()
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
