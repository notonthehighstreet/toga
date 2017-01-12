const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
let builder;
const sandbox = sinon.sandbox.create();
let subject;

const hashfilesStub = sandbox.stub();
hashfilesStub.sync = sandbox.stub();

const randomComponentsPath = chance.file();
const randomPackageJson = chance.file();
const randomComponentsPaths = [randomComponentsPath];
const fakeHash = chance.word();
let fakeBundleName;

const getConfigStub = sandbox.stub().returns({
  components: { path: randomComponentsPath, packageJson: randomPackageJson },
});

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

const deps = {
  'hash-files': hashfilesStub,
  '/config/index': getConfigStub
};
describe('bundleFilename', () => {

  beforeEach(() => {
    sandbox.reset();
    builder = requireUncached('./bundleFilename');
    fakeBundleName = chance.word();
  });

  it('generates a hash when no hash set', () => {
    subject = builder(deps);
    subject(fakeBundleName);
    expect(hashfilesStub.sync.calledWith(sinon.match.object)).to.equal(true);
  });

  it('returns a promise with a hash', () => {
    subject = builder(deps);
    hashfilesStub.sync.returns(fakeHash);
    return expect(subject(fakeBundleName)).to.equal(`${fakeBundleName}-${fakeHash}`);
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
    expect(subject(randomComponentsPaths)).to.contain('AnotherHashOfTheFiles');
  });

  it('called with correct glob', () => {
    subject = builder(deps);
    subject();
    expect(hashfilesStub.sync).to.be.calledWith({ files: [`${randomComponentsPath}/**/*`, randomPackageJson, './package.json'] });
  });
});
