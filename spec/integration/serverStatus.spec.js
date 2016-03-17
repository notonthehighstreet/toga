const expect = require('chai').expect;
const supertest = require('supertest');
const breadboard = require('breadboard');
let app;

describe('/health', () => {
  beforeEach(() => {
    app = breadboard({
      containerRoot: 'app',
      entry: (deps) => {
        return () => {
          return Promise.resolve(deps['/createServer']());
        };
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
  });
  it('responds with 200', (done) => {
    app.then(([server]) => {
      const agent = supertest.agent(server);

      agent.get('/health')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.status).to.equal('HEALTHY');
        })
        .end(done);
    });
  });
});
