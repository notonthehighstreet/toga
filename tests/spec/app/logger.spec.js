const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();

describe('Logger', () => {
  const sandbox = sinon.sandbox.create();
  const configStub = () => ({ appName: chance.word() });
  const createHoneybadgerStreamSpy = sandbox.spy();
  const fakeBunyan = {
    createLogger: sandbox.stub().returns({})
  };
  let subject;

  beforeEach(() => {
    const builder = require('../../../app/logger');

    subject = builder({
      '/config/index': configStub,
      '/lib/createHoneybadgerStream': createHoneybadgerStreamSpy,
      bunyan: fakeBunyan
    });
  });

  afterEach(() => {
    sandbox.reset();
  });
  describe('when no logger exists', () => {
    it('creates a new logger', () => {
      expect(subject()).to.deep.equal({});
    });
  });
  describe('when logger exists', () => {
    it('returns existing logger', () => {
      const logger = subject();

      expect(subject()).to.eq(logger);
    });
  });
});
