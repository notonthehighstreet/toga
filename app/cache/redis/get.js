module.exports = (deps) => {
  return function get(key) {
    const {
      'es6-promisify': promisify,
      '/cache/redis/client': client,
      debug
    } = deps;

    const log = debug('toga:cache/get');
    log(key);

    const redisGet = promisify(client.get.bind(client));

    return redisGet(key);
  };
};
