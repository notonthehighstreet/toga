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
      '/lib/webpack/createWebpackConfig': createConfigMock,
      '/lib/universalRendering/index': fakeUniversalRendering
    };
    subject = builder(deps);
  });

  afterEach(()=>{
    sandbox.reset();
  });

  context('when the bundle is successful', () => {
    it('passes through options', () => {
      result = subject({isoPlugin: fakeIsoPlugin, externals: fakeVendorFiles, modulePaths: fakeModulePaths, mapPath: fakeMapPath, minify: true});
      return result.then(() => {
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          isoPlugin: fakeIsoPlugin,
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
      result = subject({});
    });
    it('throws an error', () => {
      return result.catch((error) => {
        return expect(error).to.be.eq(webpackFailureError);
      });
    });
  });

  describe('webpack options are passed correctly', () => {
    it('minifies content', () => {
      result = subject({ minify: true });
      return result.then(() => {
        expect(createConfigMock).to.be.calledWith({
          externals: undefined,
          isoPlugin: undefined,
          minify: true,
          mapPath: undefined,
          modulePaths: undefined
        });
      });
    });
  });
});
