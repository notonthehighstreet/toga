module.exports = (deps) => {
  return function get(key) {
    const {
      'es6-promisify': promisify,
      '/cache/redis/client': client
    } = deps;
    const redisGet = promisify(client.get.bind(client));

    return redisGet(key);
  };
};
