const redisClient = require('./redis');
const promisify = require('es6-promisify');
const set = promisify(redisClient.set.bind(redisClient));

const cache = {
  get(key) {
    return new Promise((resolve, reject) => {
      redisClient.on('error', reject);
      redisClient.get(key, (err, value) => {
        if (err) {
          return reject(err);
        }
        if (value === null) {
          return reject(`Nothing cached with key ${key}`);
        }

        return resolve(value);
      });
    });
  },
  set(key, value) {
    return set(key, value);
  }
};

module.exports = cache;
