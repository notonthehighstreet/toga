const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/middleware/getComponentStyles');
const fakeCss = 'some fake css';

describe('getComponentStyles', () => {
  const sandbox = sinon.sandbox.create();
  const componentsContext =  ['a', 'b', 'c'];
  const fakeRequest = {
    componentsContext: componentsContext
  };
  const fakeResponse = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  fakeResponse.set.returns(fakeResponse);
  const nextSpy = sinon.spy();

  afterEach(() => {
    sandbox.reset();
  });

  describe('when the components css is successfully returned', () => {
    const getStylesBundleMock = () => {
      return Promise.resolve(fakeCss);
    };
    const subject = builder({
      '/lib/cssBundler/getStylesBundle': getStylesBundleMock
    });
    it('returns the components css', () => {
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
    const error = {};
    const getStylesBundleMock = () => {
      return Promise.reject(error);
    };
    const subject = builder({
      '/lib/cssBundler/getStylesBundle': getStylesBundleMock
    });
    it('propogates the error', () => {
      const result = subject(fakeRequest, fakeResponse, nextSpy);
      return result.then(() => {
        return expect(nextSpy).to.have.been.calledWith(error);
      });
    });
  });
});
