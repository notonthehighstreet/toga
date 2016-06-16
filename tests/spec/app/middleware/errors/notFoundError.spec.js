const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../../app/middleware/errors/notFoundError');

describe('NotFoundError', () => {
  const sandbox = sinon.sandbox.create();
  let subject;

  beforeEach(() => {
    subject = builder();
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
