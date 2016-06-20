const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/jsBundler/getVendorBundle');

describe('getVendorBundle', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  const loggerMock = () => {
    return {
      info: sandbox.spy(),
      error: sandbox.spy(),
      warn: sandbox.spy()
    };
  };
  const setCacheMock = () => {};
  const getCachedValue = 'cached value';
  const getCacheHitMock = () => {
    return Promise.resolve(getCachedValue);
  };
  const cacheMissError = {};
  const getCacheMissMock = () => {
    return Promise.reject(cacheMissError);
  };
  const bundleSuccessData = {
    component: 'freshly bundled component',
    vendor: 'freshly bundled vendor'
  };
  const bundleSuccessMock = () => {
    return Promise.resolve(bundleSuccessData);
  };
  const bundleFailureError = {};
  const bundleFailureMock = () => {
    return Promise.reject(bundleFailureError);
  };

  beforeEach(() => {
    deps = {
      '/cache/get': {},
      '/cache/set': setCacheMock,
      '/lib/jsBundler/webpack/runBundler': {},
      '/logger': loggerMock,
      '/lib/getAppConfig': sandbox.stub().returns({ componentsPath: chance.word() })
    };
    subject = builder(deps);
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
        const result = subject({componentNames});
        return result.then((freshVendorBundle) => {
          return expect(freshVendorBundle).to.be.eq(getCachedValue);
        });
      });
    });
    describe('and the bundle is not cached', () => {
      beforeEach(() => {
        deps['/cache/get'] = getCacheMissMock;
      });
      describe('and the bundling is successful', () => {
        beforeEach(() => {
          deps['/lib/jsBundler/webpack/runBundler'] = bundleSuccessMock;
        });
        it('returns the bundle', () => {
          const result = subject({componentNames});
          return result.then((cacheVendorBundle) => {
            return expect(cacheVendorBundle).to.be.eq(bundleSuccessData.vendor);
          });
        });
      });
      describe('and the bundling is not successful', () => {
        beforeEach(() => {
          deps['/lib/jsBundler/webpack/runBundler'] = bundleFailureMock;
        });
        it('returns an error', () => {
          const result = subject({componentNames});
          return result.catch((error) => {
            expect(error).to.be.eq(bundleFailureError);
          });
        });
      });
    });
  });
  describe('when no components are requested', () => {
    const componentNames = [];
    const noComponentsErrorMessage = 'A bundle without components can not be created';
    it('returns an error', () => {
      const result = subject({componentNames});
      return result.catch((error) => {
        expect(error.message).to.be.eq(noComponentsErrorMessage);
      });
    });
  });
});
