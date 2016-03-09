module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      'express': express,
      '/routes/index': getRoutes
      } = deps;

    const app = express();

    app.use(getRoutes());
    app.use('/public', express.static('public'));

    return new Promise((resolve) => {
      const server = app.listen(port, host, () => {
        resolve(server);
      });
    });
  };
};
