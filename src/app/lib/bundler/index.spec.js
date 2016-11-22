const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./index');
import { fakeResolve, fakeReject, fakeLogger } from '../../../../tests/commonMocks';

describe('bundler/index', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  let fakeComponentsList;
  const setCacheMock = fakeResolve();
  const getCachedValue = 'cached value';
  const cacheMissError = null;
  const componentHash = chance.word();
  const fakeComponentsPath = chance.word();
  const match = {
    js : sinon.match(/(\w*)\.js/g),
    'js.map' : sinon.match(/(\w*)\.js\.map/g),
    css : sinon.match(/(\w*)\.css/g),
    'css.map' : sinon.match(/(\w*)\.css\.map/g)
  };
  const apiVersion = '3';
  const configMock =()=> ({ apiVersion, componentsPath: fakeComponentsPath });
  const errorMessage = chance.word();
  const bundleFailureError = new Error(errorMessage);
  const bundleSuccessData = {
    js: chance.word(),
    css: chance.word(),
    'js.map': chance.word(),
    'css.map': chance.word()
  };
  const bundleSuccessMock = fakeResolve(bundleSuccessData);
  const bundleFailureMock = fakeReject(bundleFailureError);
  const bundleHashMock = sandbox.spy(() => componentHash);
  const getCacheHitMock = fakeResolve(getCachedValue);
  const getCacheMissMock = fakeResolve(cacheMissError);
  const fakeModulePaths = [chance.file()];
  const fakeMapPath = chance.word();
  const fakeNotFoundError = sandbox.stub().throws();
  const fakeBundleError = sandbox.stub().throws();
  const fakeBundleId = sandbox.stub().returns(fakeMapPath);
  const fakeComponentRoot = chance.word();
  const fakeComponentPath = chance.word();
  const fakeComponentInfo = [{ root: fakeComponentRoot, path : fakeComponentPath,  file: fakeModulePaths[0] }];
  const fakeGetComponentInfo = sandbox.stub().returns(fakeComponentInfo);
  const fakeComponentHelper = {
    bundleId: fakeBundleId
  };
  beforeEach(() => {
    deps = {
      '/cache/get': getCacheHitMock,
      '/cache/set': setCacheMock,
      '/logger': fakeLogger,
      '/lib/bundler/buildHash': bundleHashMock,
      '/lib/bundler/bundle': bundleSuccessMock,
      '/config/index': configMock,
      '/lib/getComponentInfo': fakeGetComponentInfo,
      '/lib/utils/componentHelper': fakeComponentHelper,
      '/lib/utils/errors': {
        NotFoundError: fakeNotFoundError,
        BundleError: fakeBundleError
      },
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
    const assetType = 'js';

    describe('and the bundle is cached', () => {
      it('returns the bundle', () => {
        return subject(fakeComponentsList).getAsset(assetType)
          .then((freshVendorBundle) => {
            expect(bundleSuccessMock).not.to.be.called;
            return expect(freshVendorBundle).to.be.eq(getCachedValue);
          });
      });
    });

    describe('and the bundle is not cached', () => {
      describe('and the bundle is successful', () => {
        beforeEach(() => {
          deps['/cache/get'] = getCacheMissMock;
          deps['/lib/bundler/bundle'] = bundleSuccessMock;
          subject = builder(deps);
        });

        context('when NOT minified', ()=>{
          it('returns the bundle + adds the bundles to the cache', () => {
            result = subject(fakeComponentsList).getAsset(assetType);

            return result.then((componentBundle) => {
              expect(fakeGetComponentInfo).to.have.been.calledWith(fakeComponentsList);
              expect(bundleSuccessMock).to.have.been.calledWith(fakeComponentInfo,  { minify: false, modulePaths: fakeModulePaths });
              expect(fakeComponentHelper.bundleId).to.have.been.calledWith(fakeComponentsList,  { minify: false });
              expect(componentBundle).to.be.eq(bundleSuccessData[assetType]);

              expect(setCacheMock).to.have.callCount(4);
              expect(setCacheMock.firstCall).to.have.been.calledWithMatch(match.js, bundleSuccessData['js']);
              expect(setCacheMock.secondCall).to.have.been.calledWithMatch(match.css, bundleSuccessData['css']);
              expect(setCacheMock.thirdCall).to.have.been.calledWithMatch(match['js.map'], bundleSuccessData['js.map']);
              expect(setCacheMock.lastCall).to.have.been.calledWithMatch(match['css.map'], bundleSuccessData['css.map']);
            });
          });
        });
        context('when minified', ()=>{
          it('returns the bundle + adds the bundles to the cache', () => {
            result = subject(fakeComponentsList, { minify: true }).getAsset(assetType);

            return result.then((componentBundle) => {
              expect(fakeGetComponentInfo).to.have.been.calledWith(fakeComponentsList);
              expect(bundleSuccessMock).to.have.been.calledWith(fakeComponentInfo,  { minify: true, modulePaths: fakeModulePaths });
              expect(fakeComponentHelper.bundleId).to.have.been.calledWith(fakeComponentsList,  { minify: true });
              expect(componentBundle).to.be.eq(bundleSuccessData[assetType]);

              expect(setCacheMock).to.have.callCount(8);
            });
          });
        });
      });

      describe('and the bundle is not successful', () => {
        beforeEach(() => {
          deps['/cache/get'] = getCacheMissMock;
          deps['/lib/bundler/bundle'] = bundleFailureMock;
          subject = builder(deps);
        });

        it('returns an error', () => {
          result = subject(fakeComponentsList).getAsset('js');

          return result.catch((error) => {
            expect(fakeNotFoundError).not.to.have.been.called;
            expect(fakeBundleError).to.have.been.calledWith(errorMessage);
            expect(error).to.be.an.instanceOf(Error);
          });
        });
      });
    });
  });

  describe('calls ', ()=> {
    it('bundleHash', () => {
      subject(fakeComponentsList);
      expect(bundleHashMock).to.be.called;
    });
  });
});
