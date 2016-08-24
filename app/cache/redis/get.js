module.exports = (deps) => {
  return function get(key) {
    const {
      'es6-promisify': promisify,
      '/cache/redis/client': getClient,
      '/config/index': config,
      debug
    } = deps;

    const log = debug('toga:cache/get');
    log(key);

    const client = getClient();
    const redisGet = promisify(client.get.bind(client));

    const redisKeyTTL = config.redisKeyTTL;

    client.expire(key, redisKeyTTL);

    return redisGet(key);
  };
};
