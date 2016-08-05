module.exports = function startAppServer() {
  const bootstrapApp = require('../../index');
  const config = require('../../app/lib/getAppConfig')()();

  if (config.newRelicEnabled) {
    require('newrelic');
  }

  return bootstrapApp({
    port: config.server.port,
    host: config.server.host
  })
  .then(({deps: {'/logger': getLogger}, entryResolveValue: server}) => {
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
