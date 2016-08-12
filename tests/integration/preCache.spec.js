/*eslint no-unused-vars: [2, { "argsIgnorePattern": "deps" }]*/
const expect = require('chai').expect;
const promisify = require('es6-promisify');
const Redis = require('ioredis');
const { version } = require('../../package.json');
const semver  = require('semver');
const majorVersion = semver.major(version);

const hashFiles = require('hash-files');
let hash;

const config = require('../../app/config/index');
const redisConfig = config().redis;

const redisClientConfig = {
  // With ReadyCheck enabled, accessing Redis for the first time will not be
  // permitted until a ReadyCheck has been performed. This is only a concern
  // if the Redis server is currently initializing and loading it's cache from disk
  enableReadyCheck: false,
  enableOfflineQueue: true
};
const startApp = require('./startTestServer');
let app;

describe('preCache', () => {
  before((done) => {
    app = startApp();
    app.then(() => {
      // do not simplify this, otherwise deps and server will be passed to done, which will throw various errors in breadboard
      done();
    }, done)
      .catch(done);
  });

  before((done) => {
    hashFiles({files: ['tests/integration/components/**/*']}, (err, _hash) => {
      if (err) {
        done(err);
      }
      hash = _hash;
      done();
    });
  });

  it('should cache the test component bundle in redis', (done) => {
    app.then(({entryResolveValue: server}) => {
      server.close();
      const client = Redis(redisConfig.port, redisConfig.host, redisClientConfig);
      const redisGet = promisify(client.get.bind(client));
      const promises = [];

      client.on('error', (err) => {
        client.disconnect();
        done(err);
      });
      promises.push(redisGet(`${majorVersion}-${hash}-scripts-test`));

      return Promise.all(promises).then((values) => {
        if (values.indexOf(null) > -1) {
          done(new Error('One of the bundles is missing'));
        }
        else {
          expect(values[0]).to.contain('test-text');
          done();
        }

      }, done)
      .catch(done);
    }, done);
  });
});
