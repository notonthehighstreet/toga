const getAppConfig = require('../../app/lib/getAppConfig')({
  yargs: require('yargs'),
  path: require('path'),
  semver: require('semver'),
  '/config/application.json': require('../../app/config/application.json'),
  '/config/dev.json': require('../../app/config/dev.json')
});
const bootstrapApp = require('../../');

module.exports = function startAppServer() {
  const config = getAppConfig();

  if (config.newRelicEnabled) {
    require('newrelic');
  }

  return bootstrapApp({
    port: config.server.port,
    host: config.server.host
  })
  .then(([deps, server]) => {
    const {
      '/logger': getLogger
    } = deps;
    const host = server.address().address;
    const port = server.address().port;
    const logger = getLogger();

    logger.info('Toga server listening at http://%s:%s', host, port);

    return server;
  })
  .catch((e) => {
    process.stderr.write(e.stack);
    process.exit(1);
  });
};
