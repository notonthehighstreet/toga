var queue = [];

module.exports = (deps) => {
  const {
    debug
  } = deps;
  const log = debug('toga:queue');

  return function(run) {
    return new Promise((resolve, reject) => {
      log('Adding element to queue');
      var nr = queue.push({
        runner: () => {
          run().then(() => {
            log('Running is done, que is ready for the next element');
            queue.splice(0, 1);
            if (global.gc) {
              global.gc();
            }

            if (queue[0]) {
              queue[0].runner();
              log('Running element from queue');
            }
            resolve();
          }, ()=> {
            log('Running is done, que is ready for the next element');
            queue.splice(0, 1);
            if (global.gc) {
              global.gc();
            }

            if (queue[0]) {
              queue[0].runner();
              log('Running element from queue');
            }
            reject();
          });

        }
      });

      if (nr === 1) {
        log('Starting the first element in the queue');
        queue[nr - 1].runner();
      }
    });
  };
};
