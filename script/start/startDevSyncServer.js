const config = require('../../app/lib/getAppConfig')({
  yargs: require('yargs'),
  path: require('path'),
  semver: require('semver'),
  '/config/application.json': require('../../app/config/application.json'),
  '/config/devOverrides.json': require('../../app/config/devOverrides.json')
})();
const browserSync = require('browser-sync');

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
    }, (bs) => {
      resolve(bs);
    });
  });
};
