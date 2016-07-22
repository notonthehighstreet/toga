const Redis = require('ioredis');
const breadboard = require('breadboard');
const redisClientConfig = {
  // With ReadyCheck enabled, accessing Redis for the first time will not be
  // permitted until a ReadyCheck has been performed. This is only a concern
  // if the Redis server is currently initializing and loading it's cache from disk
  enableReadyCheck: false,
  enableOfflineQueue: true
};
let server;

module.exports = function startApp(options) {
  return new Promise((resolve, reject) => {
    if (!server) {
      const client = Redis(6379, 'redis', redisClientConfig);

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
          options = options || {};
          options.entry = options.entry || '/index';
          options.containerRoot = options.containerRoot || 'app';
          options.blacklist = options.blacklist || ['newrelic'];
          options.initialState = options.initialState || {
            port: 4982,
            host: 'localhost'
          };

          server = breadboard(options);
          resolve(server);
        }
      });
    }
    else {
      resolve(server);
    }
  });
};
