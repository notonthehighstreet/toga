const getConfig = require('../../app/config/index');
const bootstrapApp = require('../../index');
const debug = require('debug');
const log = debug('toga:startAppServer');

module.exports = function startAppServer(componentsPath, opts) {
  const config = getConfig(componentsPath, opts);
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
      log(e);
      process.stderr.write(e.stack);
      process.exit(1);
    });
};
