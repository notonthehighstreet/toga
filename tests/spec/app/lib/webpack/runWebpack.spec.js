const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/webpack/runWebpack');
import { fakePromisify, fakeWebpack, fakeReject, fakeDebug } from '../../../commonMocks';

describe('runBundler', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const component = chance.word();
  const createIsoConfigMock = sandbox.stub().returns(() => {});
  const IsomorphicToolsPluginMock = sandbox.stub().returns({});
  const webpackFailureError = {};
  const webpackFailureMock = () => ({ run: fakeReject(webpackFailureError) });
  const createConfigMock = sandbox.spy();
  const fakeModulePaths = [ chance.file() ];
  const fakeVendorFiles = { [chance.word()]: chance.word() };

  beforeEach(() => {
    deps = {
      'es6-promisify': fakePromisify,
      'webpack': fakeWebpack,
      'debug': fakeDebug,
      '/lib/bundler/vendorFiles': fakeVendorFiles,
      '/lib/webpack/createWebpackConfig': createConfigMock,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPluginMock,
      '/lib/webpack/createIsoConfig': createIsoConfigMock
    };
    subject = builder(deps);
  });

  afterEach(()=>{
    sandbox.reset();
  });

  context('when the bundle is successful', () => {
    beforeEach(() => {
      result = subject(component);
    });

    it('passes through options', () => {
      result = subject(component, { modulePaths: fakeModulePaths, minify: true});
      return result.then(()=>{
        expect(IsomorphicToolsPluginMock).to.be.calledWith(createIsoConfigMock());
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          isoPlugin: IsomorphicToolsPluginMock(),
          minify: true,
          modulePaths: fakeModulePaths
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
          modulePaths: undefined
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
          modulePaths: undefined
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
          modulePaths: undefined
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
          modulePaths: undefined
        });
      });
    });
  });
});
