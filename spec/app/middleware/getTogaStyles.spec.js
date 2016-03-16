const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/middleware/getTogaStyles');

describe('getTogaStyles', () => {
  const sandbox = sinon.sandbox.create();
  const nextSpy = sandbox.spy();
  const fakeRequest = {};
  const fakeResponse = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  fakeResponse.set.returns(fakeResponse);

  afterEach(() => {
    sandbox.reset();
  });

  describe('when the css is loaded successfully', () => {
    it('returns the css', () => {
      const css = 'some compiled css';
      const subject = builder({
        '/lib/getTogaStyles': () => Promise.resolve(css)
      });

      let result = subject(fakeRequest, fakeResponse, nextSpy);
      return result.then(() => {
        return [
          expect(fakeResponse.send.calledWith(css)).to.be.true,
          expect(fakeResponse.set.calledWith('Content-Type', 'text/css')).to.be.true
        ];
      });
    });
  });

  describe('when the css is not loaded successfully', () => {
    it('propogates the error', () => {
      const fakeError = {};
      const subject = builder({
        '/lib/getTogaStyles': () => Promise.reject(fakeError)
      });
      let result = subject(fakeRequest, fakeResponse, nextSpy);
      return result.then(() => {
        return expect(nextSpy.calledWith(fakeError)).to.be.true;
      });
    });
  });
});
