module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      '/createServer': createServer
      } = deps;

    return new Promise((resolve) => {
      const server = createServer().listen(port, host, () => {
        resolve(server);
      });
    });
  };
};
