const redis = require('./redis');
const promisify = require('es6-promisify');
const set = promisify(redis.set.bind(redis));
let online = true;

const cache = {
  get(key) {
    return new Promise((resolve, reject) => {
      redis.on('error', (err) => {
        reject(err);
      });
      redis.get(key, (err, value) => {
        if (err) {
          return reject(err);
        }
        if (value === null) {
          return reject();
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
