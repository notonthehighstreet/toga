const expect = require('chai').expect;
const sinon = require('sinon');
const subject = require('./getServerStatus')();

describe('getServerStatus', () => {
  const jsonSpy = sinon.spy();
  const requestSpy = {};
  const responseSpy = {
    json: jsonSpy
  };
  const expectedJSONResponse = {
    'status': 'HEALTHY'
  };

  it('returns a json payload with healthy status', () => {
    subject(requestSpy, responseSpy);
    expect(jsonSpy).to.have.been.calledWith(expectedJSONResponse);
  });
});
