module.exports = (deps) => {
  let client;
  return () => {
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
    // We only want one instance of the Redis client used by the application. We
    // also want to make sure that it is lazily loaded so that Breadboard doesn't
    // cause an attempted connection to Redis even if it's not used.
    if(!client) {
      client = Redis(redisConfig.port, redisConfig.host, clientConfig);

      client.on('error', (err) => {
        const e = new Error('Connection to Redis failed');

        e.originalError = err;
        throw e;
      });
      client.on('close', () => {
        throw new Error('Connection to Redis closed');
      });
    }

    return client;
  };
};
