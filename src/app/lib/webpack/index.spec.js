const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./index');
import { fakePromisify, fakeWebpack, fakeReject, fakeDebug, fakePromise } from '../../../../tests/commonMocks';

describe('webpack/index', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const webpackFailureError = {};
  const webpackFailureMock = () => ({ run: fakeReject(webpackFailureError) });
  const createConfigMock = sandbox.spy();
  const fakeComponentsFile = chance.file();
  const fakeModulePaths = [ chance.file() ];
  const fakeVendorFiles = { [chance.word()]: chance.word() };
  const universalServerStub = sandbox.stub();
  const assetsJsonStub = fakePromise;
  const fakeUniversalRendering = sandbox.stub().returns({
    server: universalServerStub,
    createAssetsJson: assetsJsonStub
  });
  const queue = function(run) {
    return run();
  };

  beforeEach(() => {
    deps = {
      'es6-promisify': fakePromisify,
      'webpack': fakeWebpack,
      'debug': fakeDebug,
      '/lib/webpack/createWebpackConfig': createConfigMock,
      '/lib/webpack/queue': queue,
      '/lib/universalRendering/index': fakeUniversalRendering
    };
    subject = builder(deps);
  });

  afterEach(()=>{
    sandbox.reset();
  });

  context('when the bundle is successful', () => {
    it('passes through options', () => {
      result = subject({
        externals: fakeVendorFiles,
        modulePaths: fakeModulePaths,
        minify: false,
        componentFiles: [fakeComponentsFile]
      });
      return result.then(() => {
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          filename: undefined,
          minify: false,
          modulePaths: fakeModulePaths,
          componentFiles: [fakeComponentsFile]
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
        const configArg = createConfigMock.lastCall.args[0];
        expect(configArg.minify).to.equal(true);
      });
    });
  });
});
