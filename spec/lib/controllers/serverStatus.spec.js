const expect = require('chai').expect;
const sinon = require('sinon');
const serverStatusController = require('../../../lib/controllers/serverStatus');

describe('server status controller', () => {
  let sandbox;
  let req;
  let res;

  describe('health', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      req = {};
      res = {
        json: sandbox.spy()
      };
    });
    beforeEach(() => {
      serverStatusController.health(req, res);
    });
    it('responds with a json payload', () => {
      const expectedJSONPayload = {'status': 'HEALTHY'};
      expect(res.json.withArgs(expectedJSONPayload).calledOnce).to.be.true;
    });
  });
});
