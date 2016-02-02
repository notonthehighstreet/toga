const redisClient = require('./redis');
let errorHandlers = [];
const globalRedisHandleError = () => {
  errorHandlers.forEach((fn) => {
    fn.call();
  });
};
redisClient.on('error', globalRedisHandleError);

const cache = {
  get(key) {
    return new Promise((resolve, reject) => {
      const ourErrorHandlerIndex = errorHandlers.push(() => {
        reject('Cache not available');
      });

      redisClient.get(key, (err, value) => {
        errorHandlers.splice(ourErrorHandlerIndex - 1, 1);
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
    return new Promise((resolve, reject) => {
      const ourErrorHandlerIndex = errorHandlers.push(() => {
        reject('Cache not available');
      });

      redisClient.set(key, value, (err) => {
        errorHandlers.splice(ourErrorHandlerIndex - 1, 1);
        if (err) {
          return reject(err);
        }

        return resolve(true);
      });
    });
  }
};

module.exports = cache;
