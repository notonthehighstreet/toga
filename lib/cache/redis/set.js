const client = require('./client');
const promisify = require('es6-promisify');
const set = promisify(client.set.bind(client));

module.exports = (key, value) => {
  return set(key, value);
};
