const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/jsBundler/getComponentBundle');

describe('getComponentBundle', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  let fakeComponentsList;
  const setCacheMock = sandbox.spy(() => {
    return Promise.resolve();
  });
  const buildBundleIdMock = (componentNames) => {
    return { bundleId : componentNames, cssBundleId : componentNames, bundlePaths: componentNames };
  };
  const getCachedValue = 'cached value';
  const getCacheHitMock = sandbox.spy(() => {
    return Promise.resolve(getCachedValue);
  });
  const cacheMissError = {};
  const getCacheMissMock = () => {
    return Promise.reject(cacheMissError);
  };
  const bundleSuccessData = {
    scripts: 'freshly bundled component'
  };
  const bundleSuccessMock = () => {
    return Promise.resolve(bundleSuccessData);
  };

  const componentHash = chance.word();

  const bundleHashMock = () => {
    return Promise.resolve(componentHash);
  };
  const bundleFailureError = {};
  const bundleFailureMock = () => {
    return Promise.reject(bundleFailureError);
  };
  const bundleIdMatcher = sinon.match(new RegExp('scripts(-\\w*)', 'g'));

  const apiVersion = '3';
  const getAppConfigMock = () => {
    return {apiVersion};
  };

  beforeEach(() => {
    deps = {
      '/cache/get': getCacheHitMock,
      '/cache/set': setCacheMock,
      '/lib/buildBundleId': buildBundleIdMock,
      '/lib/buildBundleHash': bundleHashMock,
      '/lib/getAppConfig': getAppConfigMock,
      'debug': () => () => {}
    };
    subject = builder(deps);
    fakeComponentsList = chance.pickset([
      chance.word(),
      chance.word(),
      chance.word(),
      chance.word()
    ], 2);
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('when multiple components are requested', () => {
    const componentNames = ['component1', 'component2'];
    describe('and the bundle is cached', () => {
      beforeEach(() => {
        deps['/cache/get'] = getCacheHitMock;
      });
      it('returns the bundle', () => {
        result = subject({componentNames});
        return result.then((freshVendorBundle) => {
          return expect(freshVendorBundle).to.be.eq(getCachedValue);
        });
      });
    });
    describe('and the bundle is not cached', () => {
      beforeEach(() => {
        deps['/cache/get'] = getCacheMissMock;
      });
      describe('and the bundle is successful', () => {
        beforeEach(() => {
          deps['/lib/jsBundler/webpack/runBundler'] = bundleSuccessMock;
          result = subject(fakeComponentsList, 'scripts');
        });
        it('returns the bundle', () => {
          return result.then((componentBundle) => {
            return expect(componentBundle).to.be.eq(bundleSuccessData.scripts);
          });
        });
        it('adds the bundles to the cache', () => {
          return result.then(() => {
            return [
              expect(setCacheMock).to.have.been.calledWithMatch(bundleIdMatcher, bundleSuccessData.scripts)
            ];
          });
        });
      });
      describe('and the bundle is not successful', () => {
        beforeEach(() => {
          deps['/lib/jsBundler/webpack/runBundler'] = bundleFailureMock;
          result = subject(fakeComponentsList);
        });
        it('returns an error', () => {
          return result.catch((error) => {
            expect(error).to.be.eq(bundleFailureError);
          });
        });
      });
    });
  });

  describe('when no components are requested', () => {
    const noComponentsErrorMessage = 'A bundle without components can not be created';
    beforeEach(() => {
      fakeComponentsList = [];
      result = subject(fakeComponentsList);
    });
    it('returns an error', () => {
      return result.catch((error) => {
        expect(error.message).to.be.eq(noComponentsErrorMessage);
      });
    });
  });
});
