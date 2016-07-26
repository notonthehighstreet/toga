const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/buildBundleHash');

const sandbox = sinon.sandbox.create();
let subject;

const hashfilesStub = sandbox.stub();
const randomComponentsPath = chance.word();

const getAppConfigMock = () => {
  return {componentsPath: randomComponentsPath };
};
const deps = {
  '/lib/getAppConfig': getAppConfigMock,
  'hash-files': hashfilesStub,
  'es6-promisify': require('es6-promisify')
};
describe('buildBundleHash', () => {

  beforeEach(() => {
    sandbox.reset();
  });

  it('generates a hash when no hash set', () => {
    subject = builder(deps);
    subject();
    expect(hashfilesStub.calledWith(sinon.match.object, sinon.match.func)).to.equal(true);
  });

  it('returns a promise with a hash', () => {
    subject = builder(deps);
    hashfilesStub.yields( null, 'JOHN');
    return expect(subject()).to.eventually.equal('JOHN');
  });

  it('does not call file hash when hash set', (done) => {
    subject = builder(deps);
    subject().then(() => {
      subject().then(() => {

        expect(hashfilesStub.calledOnce).to.equal(true);
        done();
      }).catch(done);
      hashfilesStub.callArgWith(1, null, 'hash');

    }).catch(done);
    hashfilesStub.callArgWith(1, null, 'hash');
  });

  it('return hash when we call it second time and served from cache', (done) => {
    subject = builder(deps);
    hashfilesStub.yields( null, 'AnotherHashOfTheFiles');
    subject().then(() => {
      return subject();
    }).then((hash) => {
      expect(hash).to.equal('AnotherHashOfTheFiles');
      done();
    }).catch(done);
  });
});
