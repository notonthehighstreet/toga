const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/getComponentManifest');

describe('getComponentManifest middleware', () => {
  const sandbox = sinon.sandbox.create();
  const fakeFs = {
    readFile: sandbox.stub()
  };
  const fakeReq = {
    componentPath: '/fakeComponentPath',
    locale: 'fakeLocale'
  };
  const fakeRes = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  const nextSpy = sandbox.spy();
  const subject = builder({
    'fs': fakeFs
  });

  afterEach(() => {
    sandbox.reset();
  });
  it('reads the manifest file in the component directory specified in the request', () => {
    subject(fakeReq, fakeRes, nextSpy);
    expect(fakeFs.readFile).to.have.been.calledWith(`./components${fakeReq.componentPath}/manifest.json`);
  });
  it('responds with manifest file contents if manifest file can be read', () => {
    const fakeManifestData = '{"foo": "bar"}';

    fakeFs.readFile.yields(null, fakeManifestData);
    fakeRes.set.returns(fakeRes);
    subject(fakeReq, fakeRes, nextSpy);
    expect(fakeRes.set).to.have.been.calledWith('Content-Type: application/json');
    expect(fakeRes.send).to.have.been.calledWith(fakeManifestData);
  });
  it('calls next with error if manifest file errors on read', () => {
    const fakeError = 'fake error';

    fakeFs.readFile.yields(fakeError);
    subject(fakeReq, fakeRes, nextSpy);
    expect(nextSpy).to.have.been.calledWith(fakeError);
  });
});
