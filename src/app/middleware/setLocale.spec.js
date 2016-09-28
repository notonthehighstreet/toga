const expect = require('chai').expect;
const sinon = require('sinon');
const subject = require('./setLocale')();

describe('setLocale', () => {
  const sandbox = sinon.sandbox.create();
  const nextSpy = sandbox.spy();
  const responseSpy = {};

  afterEach(() => {
    sandbox.reset();
  });

  describe('when there is no locale set in the params', () => {
    const requestSpy = {
      query: {
        locale: undefined
      }
    };
    it('defaults the locale to en', () => {
      subject(requestSpy, responseSpy, nextSpy);
      expect(requestSpy.locale).to.eq('en');
      expect(nextSpy).to.have.been.calledOnce;
    });
  });

  describe('when there is a locale set in the params', () => {
    const requestSpy = {
      query: {
        locale: 'de'
      }
    };
    it('sets the locale to that in the params', () => {
      subject(requestSpy, responseSpy, nextSpy);
      expect(requestSpy.locale).to.eq('de');
      expect(nextSpy).to.have.been.calledOnce;
    });
  });
});
