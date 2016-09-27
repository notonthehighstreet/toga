const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./index');
import { fakePromise, fakeDebug } from '../../../../tests/commonMocks';

describe('universalRendering/index', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const component = chance.word();
  const repoPath = chance.file();
  const path = chance.file();
  const createIsoConfigMock = sandbox.stub().returns(() => {});
  const IsomorphicToolsPluginMock = sandbox.stub();
  const isoStub = sandbox.stub().returns({ server: sandbox.stub() });
  const fakeCreateJson = fakePromise;

  beforeEach(() => {
    deps = {
      'webpack-isomorphic-tools': isoStub,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPluginMock,
      '/lib/universalRendering/createWebpackAssetsJson': fakeCreateJson,
      '/lib/universalRendering/createIsoConfig': createIsoConfigMock,
      debug: fakeDebug,
    };
    subject = builder(deps);
  });

  afterEach(()=>{
    sandbox.reset();
  });

  describe('IsoPlugin', () => {
    context('when a single component is passed', ()=>{
      it('uses the isoTools plugin', () => {
        result = subject().isoPlugin(component);
        expect(IsomorphicToolsPluginMock).to.be.calledWith(createIsoConfigMock());
        expect(createIsoConfigMock).to.be.called;
        expect(createIsoConfigMock).to.be.calledWith(component, subject().assetsFilename);
        expect(result).to.be.an.instanceOf(IsomorphicToolsPluginMock);
      });
    });
  });

  describe('server', () => {
    it('uses and return isoTools server', () => {
      result = subject().server(path, repoPath);
      expect(isoStub).to.be.calledWith(createIsoConfigMock());
      expect(createIsoConfigMock).to.be.called;
      expect(createIsoConfigMock).to.be.calledWith(repoPath, subject().assetsFilename);
      expect(isoStub().server).to.be.calledWith(path);
      expect(result).to.equal(isoStub().server());
    });
  });

  describe('createAssetsJson', () => {
    it('uses and return createWebpackAssetsJson', () => {
      result = subject().createAssetsJson(component);
      expect(fakeCreateJson).to.be.calledWith(component, subject().assetsFilename);
    });
  });
});
