const Redis = require('ioredis');
const redisConfig = require('../../../config/getAppConfig.js')().redis;

const clientCOnfig = {
  // With ReadyCheck enabled, accessing Redis for the first time will not be
  // permitted until a ReadyCheck has been performed. This is only a concern
  // if the Redis server is currently initializing and loading it's cache from disk
  enableReadyCheck: false,
  // Promises do not resolve when using the OfflineQueue
  enableOfflineQueue: false
};
const client = Redis(redisConfig.port, redisConfig.host, clientCOnfig);

module.exports = client;
