module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      '/createServer': createServer,
      '/preCacheComponentBundle': preCacheComponentBundle,
      '/logger': getLogger
      } = deps;

    const logger = getLogger();
    return Promise.all([preCacheComponentBundle()]).then(() => {
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
