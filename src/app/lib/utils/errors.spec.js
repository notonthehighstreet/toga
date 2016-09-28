const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('./errors');

describe('Errors/index', () => {
  const sandbox = sinon.sandbox.create();
  let subject;

  describe('NotFoundError', () => {
    beforeEach(() => {
      subject = builder().NotFoundError;
    });

    afterEach(() => {
      sandbox.reset();
    });

    it('should be an instance of Error', () => {
      expect(new subject() instanceof Error).to.be.true;
    });

    it('should set message when provided', () => {
      var notFoundError = new subject('message');
      expect(notFoundError.message).to.equal('message');
    });

    it('should be named badRequest', () => {
      var notFoundError = new subject('message');
      expect(notFoundError.name).to.equal('NotFoundError');
    });

    it('should have stack property defined', () => {
      var notFoundError = new subject();
      expect(notFoundError.stack).to.defined;
    });
  });

  describe('BadRequestError', () => {
    beforeEach(() => {
      subject = builder().BadRequestError;
    });

    afterEach(() => {
      sandbox.reset();
    });

    it('should be an instance of Error', () => {
      expect(new subject() instanceof Error).to.be.true;
    });

    it('should set message when provided', () => {
      var badRequestError = new subject('message');
      expect(badRequestError.message).to.equal('message');
    });

    it('should be named badRequest', () => {
      var badRequestError = new subject('message');
      expect(badRequestError.name).to.equal('BadRequestError');
    });

    it('should have stack property defined', () => {
      var badRequestError = new subject();
      expect(badRequestError.stack).to.defined;
    });
  });
});
