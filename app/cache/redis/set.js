module.exports = (deps) => {
  return function set(key, value) {
    const {
      '/cache/redis/client': getClient,
      '/config/index': config,
      debug
    } = deps;

    const log = debug('toga:cache/set');
    log(key, Math.round(Buffer.byteLength(value, 'utf8')/1024 * 100) / 100 + ' kb');

    const client = getClient();
    const redisSet = client.set.bind(client);
    const redisKeyTTL = config.redisKeyTTL;

    return redisSet(key, value, 'ex', redisKeyTTL);
  };
};
