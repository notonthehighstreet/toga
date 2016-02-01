const cache = [];

cache.add = function(fn) {
  this.push(fn);
};
cache.exec = function() {
  const promises = cache.map((item) => {
    return item.call(this);
  });
  return Promise.all(promises);
};

module.exports = cache;
