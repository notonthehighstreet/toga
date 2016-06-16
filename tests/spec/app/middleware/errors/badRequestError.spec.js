const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../../app/middleware/errors/badRequestError');

describe('BadRequestError', () => {
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
    var badRequestError = new subject('message');
    expect(badRequestError.message).to.equal('message');
  });

  it('should be named badRequest', () => {
    var badRequestError = new subject('message');
    expect(badRequestError.name).to.equal('badRequestError');
  });

  it('should have stack property defined', () => {
    var badRequestError = new subject();
    expect(badRequestError.stack).to.defined;
  });
});
