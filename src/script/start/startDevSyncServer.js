module.exports = function createDevSyncServer() {
  const config = require('../../app/config/index')()();
  const browserSync = require('browser-sync');

  const server = browserSync.create();

  server.watch('./components/**/*.scss').on('change', server.reload);

  return new Promise((resolve) => {
    server.init({
      ui: false,
      open: false,
      port: config.syncServer.port,
      proxy: `http://${config.server.host}:${config.server.port}`,
      notify: false
    }, (bs) => {
      resolve(bs);
    });
  });
};
