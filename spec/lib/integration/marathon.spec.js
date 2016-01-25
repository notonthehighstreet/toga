const expect = require('chai').expect;
const supertest = require('supertest');
let marathonRouter;
let agent;

describe('/health', () => {
    beforeEach(() => {
      marathonRouter = require('../../../lib/app');
      agent = supertest.agent(marathonRouter);
    });
    it('responds with 200', (done) => {
      agent.get('/health')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body.status).to.equal('HEALTHY')
        })
        .end(done);
    });
});
