module.exports = (deps) => {
  const {
    ioredis: Redis,
    '/lib/getAppConfig': getAppConfig
    } = deps;
  const redisConfig = getAppConfig().redis;
  const clientConfig = {
    // With ReadyCheck enabled, accessing Redis for the first time will not be
    // permitted until a ReadyCheck has been performed. This is only a concern
    // if the Redis server is currently initializing and loading it's cache from disk
    enableReadyCheck: false,
    // Promises do not resolve when using the OfflineQueue
    enableOfflineQueue: false
  };

  return Redis(redisConfig.port, redisConfig.host, clientConfig);
};
