const client = require('./client');
const promisify = require('es6-promisify');
const get = promisify(client.get.bind(client));

module.exports = function redisGet(key) {
  return get(key);
};
