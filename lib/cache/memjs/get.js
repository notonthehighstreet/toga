const client = require('./client');
const promisify = require('es6-promisify');
const get = promisify(client.get.bind(client));
const _ = require('lodash');
const isNull = (str) => {
  const unicodeNull = /\u0000/g;

  return _.isNull(str) || unicodeNull.test(str.toString());
};

module.exports = (key) => {
  return get(key).then((data) => {
    return data.reduce((previous, current) => {
      if (!isNull(current)) {
        return previous + current.toString();
      }

      return previous;
    }, '');
  });
};
