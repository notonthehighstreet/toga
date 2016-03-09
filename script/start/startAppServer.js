const getAppConfig = require('../../app/lib/getAppConfig')({
  yargs: require('yargs'),
  path: require('path'),
  semver: require('semver')
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
  .then(([server, deps]) => {
    const {
      '/logger': getLogger
    } = deps;
    const host = server.address().address;
    const port = server.address().port;
    const logger = getLogger();

    logger.info('Toga server listening at http://%s:%s', host, port);

    return server;
  });
};
