const expect = require('chai').expect;
const sinon = require('sinon');
const subject = require('../../../app/middleware/getServerStatus')();

describe('getServerStatus', () => {
  const jsonMock = sinon.spy();
  const requestMock = {};
  const responseMock = {
    json: jsonMock
  };
  const expectedJSONResponse = {
    'status': 'HEALTHY'
  };

  it('returns a json payload with healthy status', () => {
    subject(requestMock, responseMock);
    expect(jsonMock).to.have.been.calledWith(expectedJSONResponse);
  });
});
