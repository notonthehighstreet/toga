var queue = [];

module.exports = (deps) => {
  const {
    debug
  } = deps;
  const log = debug('toga:queue');
  const collectGarbage = () => (global.gc) ? global.gc() : null;
  const removeItemFromQueue = () => queue.splice(0, 1);

  const runNextItem = () => {
    log(`running item on queue : ${queue.length} item(s) queued`);
    const queueItem = queue[0];
    return queueItem.run()
      .then(collectGarbage)
      .then(removeItemFromQueue)
      .then(() => !!queue.length && runNextItem())
      .then(queueItem.resolve)
      .catch(queueItem.reject);
  };

  return function(run) {
    return new Promise((resolve, reject) => {
      var queueLength = queue.push({ run, resolve, reject });
      log(`Adding item to queue : ${queueLength}`);
      if (queueLength === 1) {
        runNextItem();
      }
    });
  };
};
