const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/bundler/index');
import { fakeResolve, fakeReject, fakeLogger } from '../../../commonMocks';

describe('bundler/index', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  let fakeComponentsList;
  const setCacheMock = sandbox.spy(() => {
    return Promise.resolve();
  });
  const getCachedValue = 'cached value';
  const cacheMissError = null;
  const componentHash = chance.word();
  const fakeComponentsPath = chance.word();
  const bundleJSIdMatcher = sinon.match(new RegExp('js(-\\w*)', 'g'));
  const bundleCSSIdMatcher = sinon.match(new RegExp('css(-\\w*)', 'g'));
  const apiVersion = '3';
  const getAppConfigMock = () => {
    return { apiVersion, componentsPath: fakeComponentsPath };
  };
  const bundleFailureError = {};
  const bundleSuccessData = {
    js: 'freshly bundled js',
    css: 'freshly bundled css'
  };
  const bundleSuccessMock = fakeResolve(bundleSuccessData);
  const bundleFailureMock = fakeReject(bundleFailureError);
  const fakeBundle = sandbox.stub();
  const bundleHashMock = sandbox.spy(() => componentHash);
  const getCacheHitMock = fakeResolve(getCachedValue);
  const getCacheMissMock = fakeResolve(cacheMissError);
  const fakePathsExist = fakeResolve(true);
  const fakeModulePaths = [chance.file()];

  beforeEach(() => {
    deps = {
      '/cache/get': getCacheHitMock,
      '/cache/set': setCacheMock,
      '/logger': fakeLogger,
      '/lib/bundler/buildHash': bundleHashMock,
      '/lib/bundler/bundle': fakeBundle,
      '/lib/getAppConfig': getAppConfigMock,
      '/lib/utils/pathsExist': fakePathsExist,
      '/lib/utils/createModulePaths': () => fakeModulePaths,
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

  context('when a single component are requested', () => {
    describe('and the bundle is cached', () => {
      it('returns the bundle', () => {
        return subject(chance.word()).getAsset('js')
          .then((freshVendorBundle) => {
            return expect(freshVendorBundle).to.be.eq(getCachedValue);
          });
      });
    });
  });

  context('when multiple components are requested', () => {
    describe('and the bundle is cached', () => {
      it('returns the bundle', () => {
        return subject(fakeComponentsList).getAsset('js')
          .then((freshVendorBundle) => {
            expect(fakeBundle).not.to.be.called;
            return expect(freshVendorBundle).to.be.eq(getCachedValue);
          });
      });
    });
    describe('and the bundle is not cached', () => {
      beforeEach(() => {
        deps['/cache/get'] = getCacheMissMock;
        subject = builder(deps);
      });
      describe('and the bundle is successful', () => {
        const assetType = 'js';
        beforeEach(() => {
          deps['/lib/bundler/bundle'] = bundleSuccessMock;
          subject = builder(deps);
          result = subject(fakeComponentsList).getAsset(assetType);
        });
        it('returns the bundle', () => {
          return result.then((componentBundle) => {
            expect(fakePathsExist).to.have.been.calledWith(fakeModulePaths);
            expect(bundleSuccessMock).to.have.been.calledWith(fakeComponentsList,  { minify: false });
            return expect(componentBundle).to.be.eq(bundleSuccessData[assetType]);
          });
        });
        it('adds the bundles to the cache', () => {
          return result.then(() => {
            return [
              expect(setCacheMock).to.have.been.calledTwice,
              expect(setCacheMock.firstCall).to.have.been.calledWithMatch(bundleJSIdMatcher, bundleSuccessData['js']),
              expect(setCacheMock.secondCall).to.have.been.calledWithMatch(bundleCSSIdMatcher, bundleSuccessData['css'])
            ];
          });
        });
      });
      describe('and the bundle is not successful', () => {
        beforeEach(() => {
          deps['/lib/bundler/bundle'] = bundleFailureMock;
          subject = builder(deps);
          result = subject(fakeComponentsList).getAsset('js');
        });
        it('returns an error', () => {
          return result.catch((error) => {
            expect(error).to.be.eq(bundleFailureError);
          });
        });
      });
    });
  });
});
