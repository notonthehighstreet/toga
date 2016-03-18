const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../app/middleware/setComponentNames');
const syntaxErrorMatcher = (o) => {
  return o.constructor === SyntaxError;
};
let subject;
let sandbox = sinon.sandbox.create();
let nextSpy = sandbox.spy();
let fakeRes = {};

beforeEach(() => {
  subject = builder();
});
afterEach(() => {
  sandbox.reset();
});
describe('setComponentNames middleware', () => {
  describe('when valid JSON included in request query', () => {
    let fakeComponentsList = chance.pickset([
      chance.word(),
      chance.word(),
      chance.word(),
      chance.word()
    ]);
    let fakeReq = {
      query: {
        components: JSON.stringify(fakeComponentsList)
      }
    };
    beforeEach(() => {
      subject(fakeReq, fakeRes, nextSpy);
    });
    it('sets the component names on the request', () => {
      expect(fakeReq.componentNames).to.deep.equal(fakeComponentsList);
    });
    it('calls next without an error', () => {
      expect(nextSpy).to.have.been.calledOnce;
      expect(nextSpy).to.always.have.been.calledWithExactly();
    });
  });
  describe('when invalid JSON included in request query', () => {
    let fakeReq = {
      query: {
        components: 'I am certainly n{}t valid JSON'
      }
    };
    beforeEach(() => {
      subject(fakeReq, fakeRes, nextSpy);
    });
    it('calls next with an error', () => {
      expect(nextSpy).to.have.been.calledOnce;
      expect(nextSpy).to.have.been.calledWithMatch(syntaxErrorMatcher);
    });
  });
  describe('when no components field included in request query', () => {
    let fakeReq = {
      query: {}
    };
    beforeEach(() => {
      subject(fakeReq, fakeRes, nextSpy);
    });
    it('calls next with an error', () => {
      expect(nextSpy).to.have.been.calledOnce;
      expect(nextSpy).to.have.been.calledWithMatch(syntaxErrorMatcher);
    });
  });
});
