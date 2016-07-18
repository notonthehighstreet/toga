module.exports = (deps) => {
  return function set(key, value) {
    const {
      '/cache/redis/client': client
    } = deps;
    const redisSet = client.set.bind(client);

    return redisSet(key, value);
  };
};
