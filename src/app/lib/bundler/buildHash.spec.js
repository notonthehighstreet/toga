const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
let builder;
const sandbox = sinon.sandbox.create();
let subject;

const hashfilesStub = sandbox.stub();
hashfilesStub.sync = sandbox.stub();

const randomComponentsPath = chance.file();
const randomComponentsPaths = [randomComponentsPath];
const fakeHash = chance.word();

const getConfigStub = sandbox.stub().returns({components: { path: randomComponentsPath}});

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

const deps = {
  'hash-files': hashfilesStub,
  '/config/index': getConfigStub
};
describe('buildHash', () => {

  beforeEach(() => {
    sandbox.reset();
    builder = requireUncached('./buildHash');
  });

  it('generates a hash when no hash set', () => {
    subject = builder(deps);
    subject(randomComponentsPaths);
    expect(hashfilesStub.sync.calledWith(sinon.match.object)).to.equal(true);
  });

  it('returns a promise with a hash', () => {
    subject = builder(deps);
    hashfilesStub.sync.returns(fakeHash);
    return expect(subject()).to.equal(fakeHash);
  });

  it('does not call file hash when hash set', () => {
    subject = builder(deps);

    hashfilesStub.sync.returns('Blah');
    subject();
    subject();

    expect(hashfilesStub.sync.calledOnce).to.equal(true);
  });

  it('return hash when we call it second time and served from cache', () => {
    subject = builder(deps);
    hashfilesStub.sync.returns('AnotherHashOfTheFiles');
    subject();
    expect(subject(randomComponentsPaths)).to.equal('AnotherHashOfTheFiles');
  });

  it('called with correct glob', () => {
    subject = builder(deps);
    subject();
    expect(hashfilesStub.sync).to.be.calledWith({ files: `${randomComponentsPath}/**/*` });
  });
});
