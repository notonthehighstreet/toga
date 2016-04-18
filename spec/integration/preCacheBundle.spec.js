const _ = require('lodash');
const breadboard = require('breadboard');
const expect = require('chai').expect;
const promisify = require('es6-promisify');
const Redis = require('ioredis');

const redisClientConfig = {
  // With ReadyCheck enabled, accessing Redis for the first time will not be
  // permitted until a ReadyCheck has been performed. This is only a concern
  // if the Redis server is currently initializing and loading it's cache from disk
  enableReadyCheck: false,
  // Promises do not resolve when using the OfflineQueue
  enableOfflineQueue: true
};

let app;
function startApp() {
  return breadboard({
    entry: '/index',
    containerRoot: 'app',
    blacklist: ['newrelic'],
    initialState: {
      port: 4981,
      host: 'localhost'
    }
  });
}

describe('preCacheBundle', () => {
  beforeEach((done) => {
    const client = Redis(6379, 'localhost', redisClientConfig);

    client.flushall(() => {
      client.disconnect();
      done();
    });
  });

  it('should cache the test component in redis', (done) => {
    app = startApp();
    app.then(() => {
      const client = Redis(6379, 'localhost', redisClientConfig);
      client.on('error', (err) => {
        client.disconnect();
        done(err);
      });
      const redisGet = promisify(client.get.bind(client));
      let promises = [];

      promises.push(redisGet('component-./components/test/index.js=en'));
      promises.push(redisGet('vendor-./components/test/index.js=en'));

      return Promise.all(promises).then((values) => {
        _.forEach(values, function(item) {
          if (item === null) {
            done(new Error('One of the bundle is missing'));
          }
        });
        expect(values[0]).to.contain('test-text');
        expect(values[1]).to.contain('React');
        done();
      });
    }, (err) => {
      done(err);
    });
  });
});
