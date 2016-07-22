const expect = require('chai').expect;
const supertest = require('supertest');
const startApp = require('./startTestServer');
let app;

describe('/health', () => {
  beforeEach((done) => {
    app = startApp({
      entry: (deps) => {
        return deps['/createServer']();
      },
      blacklist: ['newrelic'],
      substitutes: {
        ioredis: () => {
          return {
            get(key, cb) {
              cb();
            },
            set(key, value, cb) {
              cb();
            },
            on() {}
          };
        }
      }
    });
    app.then(done, done);
  });
  it('responds with 200', (done) => {
    app.then(({entryResolveValue: server}) => {
      const agent = supertest.agent(server);

      agent.get('/health')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.status).to.equal('HEALTHY');
        })
        .end(done);
    }, done);
  });
});
