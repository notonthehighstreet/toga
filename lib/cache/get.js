const get = require('./redis/get');
const _ = require('lodash');

module.exports = (key) => {
  return get(key).then((data) => {
    if (_.isNull(data)) {
      throw new Error(`No value under key ${key}`);
    }

    return data;
  });
};
