let cachedClient;
module.exports = (deps) => {
  const {
    ioredis: Redis,
    '/config/index': getConfig
    } = deps;
  const config = getConfig();

  const clientConfig = {
    // With ReadyCheck enabled, accessing Redis for the first time will not be
    // permitted until a ReadyCheck has been performed. This is only a concern
    // if the Redis server is currently initializing and loading it's cache from disk
    enableReadyCheck: false,
    enableOfflineQueue: true
  };

  return () => {
    if (cachedClient) {
      return cachedClient;
    }
    const redisConfig = config.redis;
    cachedClient = Redis(redisConfig, clientConfig);

    cachedClient.on('error', (err) => {
      const e = new Error('Connection to Redis failed');

      e.originalError = err;
      throw e;
    });
    cachedClient.on('close', () => {
      throw new Error('Connection to Redis closed');
    });

    return cachedClient;
  };
};
