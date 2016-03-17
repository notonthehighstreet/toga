module.exports = (deps) => {
  return function set(key, value) {
    const {
      '/cache/memjs/client': client
    } = deps;
    const lifetime = 3600 * 24 * 30;

    return new Promise((resolve, reject) => {
      client.set(key, value, function(err, val) {
        if (err) {
          reject(err);
        }
        else {
          resolve(val);
        }
      }, lifetime);
    });
  };
};
