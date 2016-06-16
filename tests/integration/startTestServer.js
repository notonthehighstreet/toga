const Redis = require('ioredis');
const breadboard = require('breadboard');
const redisClientConfig = {
  // With ReadyCheck enabled, accessing Redis for the first time will not be
  // permitted until a ReadyCheck has been performed. This is only a concern
  // if the Redis server is currently initializing and loading it's cache from disk
  enableReadyCheck: false,
  // Promises do not resolve when using the OfflineQueue
  enableOfflineQueue: true
};
let server;

module.exports = function startApp() {
  return new Promise((resolve, reject) => {
    if (!server) {
      const client = Redis(6379, 'localhost', redisClientConfig);

      client.on('error', (err) => {
        client.disconnect();
        reject(err);
      });

      client.flushall((err) => {
        client.disconnect();
        if (err) {
          reject(err);
        }
        else {
          server = breadboard({
            entry: '/index',
            containerRoot: 'app',
            blacklist: ['newrelic'],
            initialState: {
              port: 4981,
              host: 'localhost'
            }
          });
          resolve(server);
        }
      });
    }
    else {
      resolve(server);
    }
  });
};
