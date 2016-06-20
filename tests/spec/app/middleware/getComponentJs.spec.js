const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/getComponentJs');

describe('getComponentJs', () => {
  const sandbox = sinon.sandbox.create();
  const getComponentBundleStub = sandbox.stub();
  const getCachedComponentBundleStub = sandbox.stub();
  const fakeRequest = {
    componentsContext: 'fakeComponentContext',
    locale: 'fakeLocale'
  };
  const fakeResponse = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  function NotFoundError() { }

  const nextSpy = sandbox.spy();
  const subject = builder({
    '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
    '/middleware/errors/notFoundError': NotFoundError
  });

  beforeEach(() => {
    fakeResponse.set.returns(fakeResponse);
  });
  afterEach(() => {
    sandbox.reset();
  });
  
  it('bundles content and responds with that content', () => {
    const bundleContent = {};
    const getCachedBundleContentPromise = Promise.reject();
    const bundleContentPromise = Promise.resolve(bundleContent);
    let result;

    getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
    getComponentBundleStub.returns(bundleContentPromise);
    result = subject(fakeRequest, fakeResponse, nextSpy);

    return result.then(() => {
      return [
        expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'application/javascript'),
        expect(fakeResponse.send.calledWith(bundleContent)).to.be.true
      ];
    });
  });
  it('propagates error if bundling was unsuccessful', () => {
    const err = {};
    const getCachedBundleContentPromise = Promise.reject();
    const bundleContentPromise = Promise.reject(err);
    let result;

    getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
    getComponentBundleStub.returns(bundleContentPromise);
    result = subject(fakeRequest, fakeResponse, nextSpy);

    return result.then(() => {
      expect(nextSpy.calledOnce).to.be.true;
      let firstCallArguments = nextSpy.args[0];
      return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
    });
  });
});
