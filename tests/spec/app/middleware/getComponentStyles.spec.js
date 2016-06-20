const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/getComponentStyles');
const fakeCss = 'some fake css';

describe('getComponentStyles', () => {
  const sandbox = sinon.sandbox.create();
  const getComponentBundleStub = sandbox.stub();
  const componentsContext =  ['a', 'b', 'c'];
  const fakeRequest = {
    componentsContext: componentsContext
  };
  const fakeResponse = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  fakeResponse.set.returns(fakeResponse);
  let bundleContentPromise = Promise.resolve(fakeCss);
  const nextSpy = sinon.spy();
  function NotFoundError() { }

  afterEach(() => {
    sandbox.reset();
  });

  describe('when the components css is successfully returned', () => {
    const subject = builder({
      '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
      '/middleware/errors/notFoundError': NotFoundError
    });
    it('returns the components css', () => {
      getComponentBundleStub.returns(bundleContentPromise);
      const result = subject(fakeRequest, fakeResponse, nextSpy);
      return result.then(() => {
        return [
          expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'text/css'),
          expect(fakeResponse.send).to.have.been.calledWith(fakeCss)
        ];
      });
    });
  });
  describe('when the components css is not successfully returned', () => {
    const subject = builder({
      '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
      '/middleware/errors/notFoundError': NotFoundError
    });
    it('propagates error if bundling was unsuccessful', () => {
      const err = {};
      bundleContentPromise = Promise.reject(err);
      let result;

      getComponentBundleStub.returns(bundleContentPromise);
      result = subject(fakeRequest, fakeResponse, nextSpy);

      return result.then(() => {
        expect(nextSpy.calledOnce).to.be.true;
        let firstCallArguments = nextSpy.args[0];
        return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
      });
    });
  });
});
