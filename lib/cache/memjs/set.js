const client = require('./client');
const lifetime = 3600 * 24 * 30; // future dev do not exceed 30 days otherwise you will blame yourselft

module.exports = (key, value) => {
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
