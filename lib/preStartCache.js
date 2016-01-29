const Q = require('q');
const cache = [];

cache.add = function(fn) {
  this.push(fn);
};
cache.exec = function() {
  const promises = cache.map((item)=> {
    const cDeferred = Q.defer();

    item.call(this, (err) => {
      if (err) {
        cDeferred.reject(err);
      }
      else {
        cDeferred.resolve();
      }
    });

    return cDeferred.promise;
  });

  const cacheDefer = Q.defer();

  Q.all(promises).then(()=> {
    cacheDefer.resolve();
  }, (err) => {
    cacheDefer.reject(err);
  });

  return cacheDefer.promise;
};

module.exports = cache;
