const expect = require('chai').expect;
const supertest = require('supertest');
let app;

describe('/health', () => {
  beforeEach(() => {
    app = require('../../script/start/startAppServer')();
  });
  it('responds with 200', (done) => {
    app.then((server) => {
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
