const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/bundler/bundle');
import { fakePromisify, fakeWebpack } from '../../../commonMocks';

describe('runBundler', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const component = chance.word();
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
  const fakeModulePaths = [ chance.file() ];
  const fakeVendorFiles = { [chance.word()]: chance.word() };
  beforeEach(() => {
    deps = {
      'es6-promisify': fakePromisify,
      'memory-fs': memoryFsMock,
      'webpack': fakeWebpack,
      'debug': () => () => {},
      '/lib/bundler/vendorFiles': fakeVendorFiles,
      '/lib/webpack/createWebpackConfig': createConfigMock,
      '/lib/createIsoConfig': createIsoConfigMock,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPluginMock,
      '/lib/bundler/createModulePaths': () => fakeModulePaths
    };
    subject = builder(deps);
  });

  afterEach(()=>{
    sandbox.reset();
  });

  context('when the bundle is successful', () => {
    context('when styles do NOT exist', () => {
      it('returns a bundle object with js + css is undefined', () => {
        existsSyncStub.withArgs('/components.css').returns(false);
        deps['webpack'] = webpackSuccessMock;
        result = subject(component);
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            js: componentBundle,
            css: undefined
          });
        });
      });
    });
    context('when css exist', () => {
      it('returns a bundle object with js + css', () => {
        existsSyncStub.withArgs('/components.css').returns(true);
        deps['webpack'] = webpackSuccessMock;
        result = subject(component);
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            js: componentBundle,
            css: stylesBundle
          });
        });
      });
    });
  });

  context('when the bundle is not successful', () => {
    beforeEach(() => {
      deps['webpack'] = webpackFailureMock;
      result = subject(component);
    });
    it('throws an error', () => {
      return result.catch((error) => {
        return expect(error).to.be.eq(webpackFailureError);
      });
    });
  });

  context('when a single component is passed', ()=>{
    it('uses the isoTools plugin', () => {
      result = subject(component);
      return result.then(()=>{
        expect(IsomorphicToolsPluginMock).to.be.calledWith(createIsoConfigMock());
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          isoPlugin: IsomorphicToolsPluginMock(),
          minify: undefined,
          modulePaths: fakeModulePaths
        });
      });
    });
  });

  context('when a multiple components are passed', ()=>{
    it('doesn\'t use the isoTools plugin', () => {
      result = subject([chance.word(), chance.word()]);
      return result.then(()=>{
        expect(IsomorphicToolsPluginMock).not.to.be.called;
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          isoPlugin: null,
          minify: undefined,
          modulePaths: fakeModulePaths
        });
      });
    });
  });

  describe('webpack options are passed correctly', () => {
    it('sets the externals webpack option if the component is vendor', () => {
      result = subject('vendor');
      return result.then(()=>{
        expect(createConfigMock).to.be.calledWith({
          externals: [],
          isoPlugin: { },
          minify: undefined,
          modulePaths: fakeModulePaths
        });
      });
    });

    it('minifies content', () => {
      result = subject(chance.word(), { minify: true });
      return result.then(() => {
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          isoPlugin: { },
          minify: true,
          modulePaths: fakeModulePaths
        });
      });
    });
  });
});
