const debug = require('debug')('toga');
const config = require('../config/getAppConfig')();
const app = require('../');

module.exports = function startAppServer() {
  const server = app.listen(config.server.port, config.server.host, () => {
    const host = server.address().address;
    const port = server.address().port;

    debug('Toga server listening at http://%s:%s', host, port);
  });
};
