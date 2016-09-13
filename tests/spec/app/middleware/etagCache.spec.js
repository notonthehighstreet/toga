const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/etagCache');
const Chance = require('chance');
const chance = new Chance();

const sandbox = sinon.sandbox.create();
const getComponentInfoStub = sandbox.stub();
const buildHashStub = sandbox.stub();
const hash = chance.word();
const components = ['1'];
getComponentInfoStub.returns(components);
buildHashStub.returns(hash);
const reqGetStub = sandbox.stub().returns(hash);

const fakeRequest = {
  get: reqGetStub
};

const sendStatusStub = sandbox.stub();
const fakeResponse = {
  sendStatus: sendStatusStub
};
const nextStub = sandbox.stub();

const subject = builder({
  '/lib/getComponentInfo': getComponentInfoStub,
  '/lib/bundler/buildHash': buildHashStub
});

describe('etagCache', () => {

  afterEach(() => {
    sandbox.reset();
  });

  context('returnHash', () => {
    it('returns function returning hash', () => {
      expect(subject.returnHash()).to.eq(hash);
    });
  });

  context('etagRequest', () => {
    const etagRequest = subject.etagRequest;

    it('when header matches hash', () => {
      etagRequest(fakeRequest, fakeResponse, nextStub);

      expect(sendStatusStub).to.be.calledWith(304);
      expect(nextStub).to.not.have.been.called;
    });

    it('when header does not matches hash', () => {
      reqGetStub.returns(undefined);
      etagRequest(fakeRequest, fakeResponse, nextStub);
      expect(nextStub).to.have.been.calledOnce;
    });
  });
});
