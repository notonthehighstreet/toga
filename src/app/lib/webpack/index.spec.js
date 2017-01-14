const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./index');
import { fakeDebug } from '../../../../tests/commonMocks';

const sandbox = sinon.sandbox.create();
const webpackFailureError = chance.word();
const fakeWebpack  = sandbox.stub().returns({
  run: (callback) => callback()
});
const webpackFailureMock = sandbox.stub().returns({
  run: (callback) => callback(webpackFailureError)
});

describe('webpack/index', () => {
  let deps;
  let subject;
  let result;
  const createConfigMock = sandbox.spy();
  const fakeModulePaths = [ chance.file() ];
  const fakeVendorFiles = { [chance.word()]: chance.word() };

  beforeEach(() => {
    deps = {
      'webpack': fakeWebpack,
      'debug': fakeDebug,
      '/lib/webpack/createWebpackConfig': createConfigMock,
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
        minify: false
      });
      return result.then(() => {
        expect(createConfigMock).to.be.called;
        expect(createConfigMock).to.be.calledWith({
          externals: fakeVendorFiles,
          modulePaths: fakeModulePaths,
          minify: false
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
