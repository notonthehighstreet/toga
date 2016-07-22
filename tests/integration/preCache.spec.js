/*eslint no-unused-vars: [2, { "argsIgnorePattern": "deps" }]*/
const expect = require('chai').expect;
const promisify = require('es6-promisify');
const Redis = require('ioredis');
const { version } = require('../../package.json');
const semver  = require('semver');
const majorVersion = semver.major(version);

const hashFiles = require('hash-files');
let hash;

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

  before((done) => {
    hashFiles({files: ['tests/integration/components/test/**']}, (err, _hash) => {
      if (err) {
        done(err);
      }
      hash = _hash;
      done();
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
      promises.push(redisGet(`${majorVersion}-scripts-test-${hash}`));

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
      })
      .catch((err) => {
        done(err);
      });
    }, (err) => {
      done(err);
    });
  });
});
