module.exports = (deps) => {
  return function get(key) {
    const {
      '/cache/redis/get': redisGet,
      'lodash': _
    } = deps;

    return redisGet(key).then((data) => {
      if (_.isNull(data)) {
        throw new Error(`No value under key ${key}`);
      }

      return data;
    });
  };
};
