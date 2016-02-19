const browserSync = require('browser-sync');
const config = require('../config/getAppConfig')();

module.exports = function createDevSyncServer() {
  const server = browserSync.create();

  server.watch('./components/**/*.scss').on('change', server.reload);

  return new Promise((resolve) => {
    server.init({
      ui: false,
      open: false,
      port: config.syncServer.port,
      proxy: `http://${config.server.host}:${config.server.port}`,
      notify: false
    }, () => {
      resolve(server);
    });
  });
};
