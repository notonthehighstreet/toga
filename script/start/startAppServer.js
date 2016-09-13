require('babel-core/register');
const getConfig = require('../../app/config/index');
const bootstrapApp = require('../../index');

module.exports = function startAppServer(componentsPath) {
  const config = getConfig(componentsPath);
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
      console.log(e); // eslint-disable-line
      process.stderr.write(e.stack);
      process.exit(1);
    });
};
