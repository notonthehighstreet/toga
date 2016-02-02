require('babel-core/register');
const app = require('./lib/app');
const debug = require('debug')('toga');
const preStartCache = require('./lib/preStartCache');

preStartCache.exec().then(startServer, (err) => debug(err));
function startServer() {
  const server = app.listen(8080, '0.0.0.0', () => {
    const host = server.address().address;
    const port = server.address().port;

    debug('Example app listening at http://%s:%s', host, port);
  });
}
