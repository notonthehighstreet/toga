const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/jsBundler/webpack/runBundler');

describe('runBundler', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const fsMock = {
    stat: sandbox.spy()
  };
  const promisifyMock = (promise) => {
    return promise;
  };
  const componentBundle = 'component bundle';
  const vendorBundle = 'vendor bundle';
  const readFileStub = sandbox.stub();
  readFileStub.withArgs('/vendor.bundle.js', 'utf8').returns(Promise.resolve(vendorBundle));
  readFileStub.withArgs('/components.js', 'utf8').returns(Promise.resolve(componentBundle));
  const memoryFsMock = function() {
    this.readFile = readFileStub;
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
  const loggerMock = () => {
    return {
      error: sandbox.spy()
    };
  };
  const createConfigMock = sandbox.spy();
  const fakeDefinitions = {};
  const fakeModulePaths = [
    chance.file()
  ];
  beforeEach(() => {
    deps = {
      'fs': fsMock,
      'es6-promisify': promisifyMock,
      'memory-fs': memoryFsMock,
      '/logger': loggerMock,
      '/lib/jsBundler/webpack/createConfig': createConfigMock
    };
    subject = builder(deps);
  });
  describe('when the bundle is successful', () => {
    beforeEach(() => {
      deps['webpack'] = webpackSuccessMock;
      result = subject({modulePaths: fakeModulePaths, definitions: fakeDefinitions});
    });
    it('returns a bundle object', () => {
      return result.then((bundle) => {
        return expect(bundle).to.be.deep.eq({
          component: componentBundle,
          vendor: vendorBundle
        });
      });
    });
  });
  describe('when the bundle is not successful', () => {
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
});
