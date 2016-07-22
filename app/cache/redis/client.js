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
    enableOfflineQueue: true
  };
  const client = Redis(redisConfig, clientConfig);

  client.on('error', (err) => {
    const e = new Error('Connection to Redis failed');

    e.originalError = err;
    throw e;
  });
  client.on('close', () => {
    throw new Error('Connection to Redis closed');
  });

  return client;
};
