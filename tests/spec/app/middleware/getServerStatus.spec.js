const expect = require('chai').expect;
const sinon = require('sinon');
const subject = require('../../../../app/middleware/getServerStatus')();

describe('getServerStatus', () => {
  const jsonSpy = sinon.spy();
  const nextSpy = sinon.spy();
  const requestSpy = {};
  const responseSpy = {
    json: jsonSpy
  };
  const expectedJSONResponse = {
    'status': 'HEALTHY'
  };

  it('returns a json payload with healthy status', () => {
    subject(requestSpy, responseSpy, nextSpy);
    expect(jsonSpy).to.have.been.calledWith(expectedJSONResponse);
    expect(nextSpy).to.have.been.calledOnce;
  });
});
