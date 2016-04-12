const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../app/middleware/setComponentNames');
let subject;
let sandbox = sinon.sandbox.create();
let nextSpy = sandbox.spy();
let fakeRes = {};

function BadRequestError() { }

describe('setComponentNames middleware', () => {
  beforeEach(() => {
    subject = builder({
      '/middleware/errors/badRequestError': BadRequestError
    });
  });
  afterEach(() => {
    sandbox.reset();
  });
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
      let firstCallArguments = nextSpy.args[0];
      return expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
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
      let firstCallArguments = nextSpy.args[0];
      return expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
    });
  });
});
