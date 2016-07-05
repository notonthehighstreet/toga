module.exports = (deps) => {
  return function set(key, value) {
    const {
      'es6-promisify': promisify,
      '/cache/redis/client': client
    } = deps;
    const redisSet = promisify(client().set.bind(client));

    return redisSet(key, value);
  };
};
