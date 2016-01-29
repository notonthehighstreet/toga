const Q = require('q');
const cache = [];

cache.add = function(fn) {
  this.push(fn);
};
cache.exec = function() {
  const promises = cache.map((item) => {
    return item.call(this);
  });
  return Q.all(promises);
};

module.exports = cache;
