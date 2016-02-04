const queue = [];

queue.add = function(fn) {
  this.push(fn);
};
queue.exec = function() {
  const promises = queue.map((fn) => {
    return fn();
  });
  return Promise.all(promises);
};

module.exports = queue;
