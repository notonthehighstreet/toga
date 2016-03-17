const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/middleware/getVendorBundle');

describe('getVendorBundle', () => {
  const sandbox = sinon.sandbox.create();
  const syntaxErrorMatcher = (o) => {
    return o.constructor === SyntaxError;
  };
  const nextSpy = sandbox.spy();
  const loggerMock = () => {
    return {
      info: sandbox.spy()
    };
  };
  const fakeResponse = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  fakeResponse.set.returns(fakeResponse);

  afterEach(() => {
    sandbox.reset();
  });

  describe('when component names are invalid JSON', () => {
    const fakeRequest = {
      query: {
        components: 'I can\'t be JS{}N parsed'
      }
    };
    it('logs the error and propogates it', () => {
      const subject = builder({
        '/logger': loggerMock,
        '/lib/jsBundler/getVendorBundle': {}
      });
      subject(fakeRequest, fakeResponse, nextSpy);
      expect(nextSpy).to.have.been.calledWithMatch(syntaxErrorMatcher);
    });
  });
  describe('when component names are valid JSON', () => {
    const validEncodedComponents = JSON.stringify(['component1', 'component2']);
    const fakeRequest = {
      query: {
        components: validEncodedComponents
      }
    };
    describe('when the bundle is retrieved', () => {
      const javascriptBundle = 'a javascript bundle';
      const getVendorBundleMock = () => {
        return Promise.resolve(javascriptBundle);
      };
      const subject = builder({
        '/logger': loggerMock,
        '/lib/jsBundler/getVendorBundle': getVendorBundleMock
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
      const getVendorBundleMock = () => {
        return Promise.reject(error);
      };
      const subject = builder({
        '/logger': loggerMock,
        '/lib/jsBundler/getVendorBundle': getVendorBundleMock
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
