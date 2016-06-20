const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/getVendorJs');

describe('getVendorJs', () => {
  const sandbox = sinon.sandbox.create();
  const nextSpy = sandbox.spy();
  const fakeResponse = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  function NotFoundError() { }

  fakeResponse.set.returns(fakeResponse);
  afterEach(() => {
    sandbox.reset();
  });
  describe('when component names are valid JSON', () => {
    const validEncodedComponents = JSON.stringify(['component1', 'component2']);
    const fakeRequest = {
      query: {
        components: validEncodedComponents
      }
    };
    const javascriptBundle = 'a javascript bundle';
    describe('when the vendor bundle is cached', () => {
      const getComponentBundleStub = sandbox.stub().returns(Promise.resolve(javascriptBundle));
      const subject = builder({
        '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
        '/middleware/errors/notFoundError': NotFoundError
      });

      it('returns the vendor bundle', () => {
        const result = subject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(fakeResponse.send).to.be.calledWith(javascriptBundle),
            expect(fakeResponse.set).to.be.calledWith('Content-Type', 'application/javascript')
          ];
        });
      });
    });
    describe('when the vendor bundle is not cached', () => {
      describe('when the bundle is retrieved', () => {
        const getVendorBundleMock = () => Promise.resolve(javascriptBundle);
        const subject = builder({
          '/lib/jsBundler/getComponentBundle': getVendorBundleMock,
          '/middleware/errors/notFoundError': NotFoundError
        });
        it('returns the vendor bundle', () => {
          const result = subject(fakeRequest, fakeResponse, nextSpy);
          return result.then(() => {
            return [
              expect(fakeResponse.send).to.be.calledWith(javascriptBundle),
              expect(fakeResponse.set).to.be.calledWith('Content-Type', 'application/javascript')
            ];
          });
        });
      });
      describe('when the bundle is not retrieved', () => {
        const error = {};
        const getVendorBundleMock = () => Promise.reject(error);
        const subject = builder({
          '/lib/jsBundler/getComponentBundle': getVendorBundleMock,
          '/middleware/errors/notFoundError': NotFoundError
        });
        it('propogates the error', () => {
          const result = subject(fakeRequest, fakeResponse, nextSpy);
          return result.then(() => {
            return expect(nextSpy).to.have.been.calledWith(error);
          });
        });
      });
    });
  });
});
