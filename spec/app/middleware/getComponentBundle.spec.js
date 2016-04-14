const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/middleware/getComponentBundle');

describe('getComponentBundle', () => {
  const sandbox = sinon.sandbox.create();
  const getComponentBundleStub = sandbox.stub();
  const getCachedComponentBundleStub = sandbox.stub();
  const fakeReq = {
    componentsContext: 'fakeComponentContext',
    locale: 'fakeLocale'
  };
  const fakeRes = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  function NotFoundError() { }

  const nextSpy = sandbox.spy();
  const subject = builder({
    '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
    '/lib/getComponentBundleFromCache': getCachedComponentBundleStub,
    '/middleware/errors/notFoundError': NotFoundError
  });

  beforeEach(() => {
    fakeRes.set.returns(fakeRes);
  });
  afterEach(() => {
    sandbox.reset();
  });
  describe('cached bundle was found', () => {
    it('responds with bundled content', () => {
      const bundleContent = {};
      const getCachedBundleContentPromise = Promise.resolve(bundleContent);
      let result;

      getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
      result = subject(fakeReq, fakeRes, nextSpy);

      return result.then(() => {
        return expect(fakeRes.send.calledWith(bundleContent)).to.be.true;
      });
    });
  });
  describe('cached bundle was not found', () => {
    it('bundles content and responds with that content', () => {
      const bundleContent = {};
      const getCachedBundleContentPromise = Promise.reject();
      const bundleContentPromise = Promise.resolve(bundleContent);
      let result;

      getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
      getComponentBundleStub.returns(bundleContentPromise);
      result = subject(fakeReq, fakeRes, nextSpy);

      return result.then(() => {
        return expect(fakeRes.send.calledWith(bundleContent)).to.be.true;
      });
    });
    it('propagates error if bundling was unsuccessful', () => {
      const err = {};
      const getCachedBundleContentPromise = Promise.reject();
      const bundleContentPromise = Promise.reject(err);
      let result;

      getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
      getComponentBundleStub.returns(bundleContentPromise);
      result = subject(fakeReq, fakeRes, nextSpy);

      return result.then(() => {
        expect(nextSpy.calledOnce).to.be.true;
        let firstCallArguments = nextSpy.args[0];
        return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
      });
    });
  });
});
