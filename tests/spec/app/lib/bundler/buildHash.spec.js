const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
let builder;
const sandbox = sinon.sandbox.create();
let subject;

const hashfilesStub = sandbox.stub();
hashfilesStub.sync = sandbox.stub();

const randomComponentsPath = [chance.word()];
const fakeHash = chance.word();

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

const deps = {
  'hash-files': hashfilesStub
};
describe('buildHash', () => {

  beforeEach(() => {
    sandbox.reset();
    builder = requireUncached('../../../../../app/lib/bundler/buildHash');
  });

  it('generates a hash when no hash set', () => {
    subject = builder(deps);
    subject(randomComponentsPath);
    expect(hashfilesStub.sync.calledWith(sinon.match.object)).to.equal(true);
  });

  it('returns a promise with a hash', () => {
    subject = builder(deps);
    hashfilesStub.sync.returns(fakeHash);
    return expect(subject(randomComponentsPath)).to.equal(fakeHash);
  });

  it('does not call file hash when hash set', () => {
    subject = builder(deps);

    hashfilesStub.sync.returns('Blah');
    subject(randomComponentsPath);
    subject(randomComponentsPath);

    expect(hashfilesStub.sync.calledOnce).to.equal(true);
  });

  it('return hash when we call it second time and served from cache', () => {
    subject = builder(deps);
    hashfilesStub.sync.returns('AnotherHashOfTheFiles');
    subject(randomComponentsPath);
    expect(subject(randomComponentsPath)).to.equal('AnotherHashOfTheFiles');
  });
});
