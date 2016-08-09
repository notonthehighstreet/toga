const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/webpack/index');
import { fakePromisify, fakeWebpack, fakeReject, fakeDebug, fakePromise } from '../../../commonMocks';

describe('webpack/index', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const component = chance.word();
  const webpackFailureError = {};
  const webpackFailureMock = () => ({ run: fakeReject(webpackFailureError) });
  const createConfigMock = sandbox.spy();
  const fakeModulePaths = [ chance.file() ];
  const fakeVendorFiles = { [chance.word()]: chance.word() };
  const universalServerStub = sandbox.stub();
  const assetsJsonStub = fakePromise;
  const fakeIsoPlugin = sandbox.spy();
  const fakeUniversalRendering = sandbox.stub().returns({
    isoPlugin: fakeIsoPlugin,
    server: universalServerStub,
    createAssetsJson: assetsJsonStub
  });
  const fakeMapPath = chance.word();

  beforeEach(() => {
    deps = {
      'es6-promisify': fakePromisify,
      'webpack': fakeWebpack,
      'debug': fakeDebug,
      '/lib/bundler/vendorFiles': fakeVendorFiles,
      '/lib/webpack/createWebpackConfig': createConfigMock,
      '/lib/universalRendering/index': fakeUniversalRendering
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
      result = subject(component, { modulePaths: fakeModulePaths, mapPath: fakeMapPath, minify: true});
      return result.then(()=>{
        expect(fakeUniversalRendering).to.be.called;
        expect(fakeUniversalRendering().isoPlugin).to.be.calledWith(component);
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          isoPlugin: fakeUniversalRendering().isoPlugin(),
          minify: true,
          mapPath: fakeMapPath,
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

  describe('webpack options are passed correctly', () => {
    it('sets the externals webpack option if the component is vendor', () => {
      result = subject('vendor');
      return result.then(()=>{
        expect(createConfigMock).to.be.calledWith({
          externals: [],
          isoPlugin: undefined,
          minify: undefined,
          mapPath: undefined,
          modulePaths: undefined
        });
      });
    });

    it('minifies content', () => {
      result = subject(chance.word(), { minify: true });
      return result.then(() => {
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          isoPlugin: undefined,
          minify: true,
          mapPath: undefined,
          modulePaths: undefined
        });
      });
    });
  });
});
