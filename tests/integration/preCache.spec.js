/*eslint no-unused-vars: [2, { "argsIgnorePattern": "deps" }]*/
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
const startApp = require('./startTestServer');
let app;

describe('preCache', () => {
  before((done) => {
    app = startApp();
    app
      .then(() => {
        done();
      }, (err) => {
        done(err);
      });
  });

  it('should cache the test component bundle in redis', (done) => {
    app.then(([deps, server]) => {
      server.close();
      const client = Redis('redis', 'localhost', redisClientConfig);
      const redisGet = promisify(client.get.bind(client));
      const promises = [];

      client.on('error', (err) => {
        client.disconnect();
        done(err);
      });
      promises.push(redisGet('scripts-test'));

      return Promise.all(promises).then((values) => {
        values.forEach((item) => {
          if (item === null) {
            done(new Error('One of the bundles is missing'));
          }
        });
        expect(values[0]).to.contain('test-text');
        done();
      }, (errs) => {
        done(errs);
      });
    }, (err) => {
      done(err);
    });
  });
});
