const config = require('../config/getAppConfig')();
const logger = require('./lib/logger');
const app = require('../');

module.exports = function startAppServer() {
  const server = app.listen(config.server.port, config.server.host, () => {
    const host = server.address().address;
    const port = server.address().port;

    logger.info('Toga server listening at http://%s:%s', host, port);
  });
};
