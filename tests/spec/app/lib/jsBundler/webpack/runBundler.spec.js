const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../../app/lib/jsBundler/webpack/runBundler');
import { fakeLogger, fakePromisify, fakeFs, fakeWebpack } from '../../../../commonMocks';

describe('runBundler', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const componentBundle = 'component bundle';
  const stylesBundle = 'styles bundle';
  const readFileStub = sandbox.stub();
  const existsSyncStub = sandbox.stub();
  const createIsoConfigMock = sandbox.stub().returns(() => {});
  const IsomorphicToolsPluginMock = sandbox.stub().returns({});
  readFileStub.withArgs('/components.js', 'utf8').returns(Promise.resolve(componentBundle));
  readFileStub.withArgs('/components.css', 'utf8').returns(Promise.resolve(stylesBundle));
  const memoryFsMock = function() {
    this.readFile = readFileStub;
    this.existsSync = existsSyncStub;
  };
  const webpackSuccessMock = () => {
    return {
      run: sandbox.spy(() => {
        return Promise.resolve();
      })
    };
  };
  const webpackFailureError = {};
  const webpackFailureMock = () => {
    return {
      run: sandbox.spy(() => {
        return Promise.reject(webpackFailureError);
      })
    };
  };
  const createConfigMock = sandbox.spy();
  const fakeDefinitions = {};
  const fakeModulePaths = [
    chance.file()
  ];
  beforeEach(() => {
    deps = {
      'fs': fakeFs,
      'webpack': fakeWebpack,
      'es6-promisify': fakePromisify,
      'memory-fs': memoryFsMock,
      '/logger': fakeLogger,
      'debug': () => () => {},
      '/lib/createIsoConfig': createIsoConfigMock,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPluginMock,
      '/lib/jsBundler/webpack/createConfig': createConfigMock
    };
    subject = builder(deps);
  });

  afterEach(()=>{
    sandbox.reset();
  });

  context('when the bundle is successful', () => {

    context('when styles do NOT exist', () => {
      it('returns a bundle object with 2 bundles', () => {
        existsSyncStub.withArgs('/components.css').returns(false);
        deps['webpack'] = webpackSuccessMock;
        result = subject({modulePaths: fakeModulePaths, definitions: fakeDefinitions});
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            scripts: componentBundle,
            styles: undefined
          });
        });
      });
    });
    context('when styles exist', () => {
      it('returns a bundle object with 3 bundles', () => {
        existsSyncStub.withArgs('/components.css').returns(true);
        deps['webpack'] = webpackSuccessMock;
        result = subject({modulePaths: fakeModulePaths, definitions: fakeDefinitions});
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            scripts: componentBundle,
            styles: stylesBundle
          });
        });
      });
    });
  });

  context('when the bundle is not successful', () => {
    beforeEach(() => {
      deps['webpack'] = webpackFailureMock;
      result = subject({modulePaths: fakeModulePaths, definitions: fakeDefinitions});
    });
    it('throws an error', () => {
      return result.catch((error) => {
        return expect(error).to.be.eq(webpackFailureError);
      });
    });
  });

  context('when a single component is passed', ()=>{
    it('uses the isoTools plugin', () => {
      result = subject({ component: chance.word(), modulePaths: fakeModulePaths, definitions: fakeDefinitions });
      return result.then(()=>{
        expect(IsomorphicToolsPluginMock).to.be.calledWith(createIsoConfigMock());
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          definitions: {},
          externals: [],
          isoPlugin: IsomorphicToolsPluginMock(),
          minify: undefined,
          modulePaths: fakeModulePaths
        });
      });
    });
  });

  context('when a multiple components are passed', ()=>{
    it('doesn\'t use the isoTools plugin', () => {
      const components = [chance.word(), chance.word()];
      result = subject({ component: components, modulePaths: fakeModulePaths, definitions: fakeDefinitions });
      return result.then(()=>{
        expect(IsomorphicToolsPluginMock).not.to.be.called;
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          definitions: {},
          externals: [],
          isoPlugin: null,
          minify: undefined,
          modulePaths: fakeModulePaths
        });
      });
    });
  });
});
