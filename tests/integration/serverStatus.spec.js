/*eslint no-unused-vars: [2, { "argsIgnorePattern": "deps" }]*/
const expect = require('chai').expect;
const supertest = require('supertest');
let app;

const startApp = require('./startTestServer');

describe('/health', () => {
  beforeEach((done) => {
    app = startApp({
      entry: (deps) => {
        return () => {
          return Promise.resolve(deps['/createServer']());
        };
      },
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
    app
      .then(() => {
        done();
      }, (err) => {
        done(err);
      });
  });
  it('responds with 200', (done) => {
    app.then(([deps, server]) => {
      const agent = supertest.agent(server);

      agent.get('/health')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.status).to.equal('HEALTHY');
        })
        .end((err) => {
          done(err);
        });
    }).catch((err) => {
      done(err);
    });
  });
});
