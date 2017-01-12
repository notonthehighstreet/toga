const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./index');
import { fakePromise, fakeDebug, fakeReject } from '../../../../tests/commonMocks';

const sandbox = sinon.sandbox.create();

const bundleFilenameStub = sandbox.stub();
const bundleFileName = chance.word();
bundleFilenameStub.returns(bundleFileName);

const fakeFile =  chance.file() ;
const fakeModulePaths = [ fakeFile ];
const fakeVendorBundleComponent = { name : chance.word(), file: fakeFile };
const fakeVendorFiles = [{ [chance.word()]: chance.word() }];

const configMock = ()=> ({
  vendor: {
    componentName:  fakeVendorBundleComponent.name,
    'bundle': fakeVendorFiles
  }
});

let fakeComponentName = chance.word();
const fakeRelativeComponentPath = `../../components/${fakeComponentName}`;
const fakeComponentInfo = [{ requirePath : fakeRelativeComponentPath, path : chance.word(),  file: fakeModulePaths[0],  name: chance.word() }];
let fakeGetComponentInfo = sandbox.stub().returns(fakeComponentInfo);

describe('runBundler', () => {
  let deps;
  let subject;
  let result;
  let fakeRunWebpack;

  let fakeComponentsList;
  const errorMessage = chance.word();
  const bundleFailureError = new Error(errorMessage);
  const bundleFailureMock = fakeReject(bundleFailureError);
  const fakeNotFoundError = sandbox.stub().throws();
  const fakeBundleError = sandbox.stub().throws();
  const fakeComponentFiles = chance.file();
  const component = { name: chance.word(), file: fakeComponentFiles };
  const components = [component];
  const componentBundle = chance.word();
  const stylesBundle = chance.word();
  const componentMapBundle = chance.word();
  const stylesMapBundle = chance.word();
  const readdirSyncStub = sandbox.stub().returns(fakeModulePaths);
  const readFileStub = sandbox.stub();
  const existsSyncStub = sandbox.stub();
  const memoryFsMock = sandbox.stub();
  readFileStub.withArgs('/components.js', 'utf8').returns(Promise.resolve(componentBundle));
  readFileStub.withArgs('/components.css', 'utf8').returns(Promise.resolve(stylesBundle));
  readFileStub.withArgs('/components.js.map', 'utf8').returns(Promise.resolve(componentMapBundle));
  readFileStub.withArgs('/components.css.map', 'utf8').returns(Promise.resolve(stylesMapBundle));
  memoryFsMock.returns({
    readdirSync: readdirSyncStub,
    readFile : readFileStub,
    existsSync : existsSyncStub
  });

  beforeEach(() => {
    fakeRunWebpack = fakePromise;
    deps = {
      '/config/index': configMock,
      '/lib/getComponentInfo': fakeGetComponentInfo,
      '/lib/webpack/index': fakeRunWebpack,
      '/lib/utils/bundleFilename': bundleFilenameStub,
      'debug': fakeDebug,
      '/lib/utils/errors': {
        NotFoundError: fakeNotFoundError,
        BundleError: fakeBundleError
      }
    };
  });

  afterEach(()=>{
    sandbox.reset();
  });

  describe('runWebpack options are passed correctly', () => {
    it('sets the defaults', () => {
      subject = builder(deps);
      result = subject(components);
      return result.then(()=>{
        expect(fakeRunWebpack).to.be.calledWith({
          externals: fakeVendorFiles,
          minify: false,
          modulePaths: fakeModulePaths,
          componentFiles: [fakeFile],
          filename: bundleFileName,
          bundleName: undefined
        });
      });
    });

    it('sets the externals webpack option to an empty array if the component is vendor', () => {
      const fakeVendorComponentInfo = [{ name: fakeVendorBundleComponent.name, requirePath : fakeRelativeComponentPath, path : chance.word(),  file: fakeModulePaths[0] }];
      deps['/lib/getComponentInfo'] =  sandbox.stub().returns(fakeVendorComponentInfo);
      subject = builder(deps);

      result = subject([fakeVendorBundleComponent]);
      return result.then(()=>{
        expect(fakeRunWebpack).to.be.calledWith({
          externals: [],
          minify: false,
          modulePaths: fakeModulePaths,
          componentFiles: [fakeFile],
          filename: bundleFileName,
          bundleName: undefined
        });
      });
    });

    it('sets the externals webpack option to the fake vendors bundle if the component is NOT vendor', () => {
      subject = builder(deps);
      result = subject(components, {});
      return result.then(()=>{
        expect(fakeRunWebpack).to.be.calledWith({
          externals: fakeVendorFiles,
          minify: false,
          modulePaths: fakeModulePaths,
          componentFiles: [fakeFile],
          filename: bundleFileName,
          bundleName: undefined
        });
      });
    });

    it('minifies content', () => {
      subject = builder(deps);
      result = subject(components, { minify: true });
      return result.then(() => {
        const webpackConfigArg = fakeRunWebpack.lastCall.args[0];
        expect(webpackConfigArg.minify).to.equal(true);
      });
    });
  });

  describe('the bundle is not successful', () => {

    deps = {
      '/lib/bundler/bundle': bundleFailureMock,
      '/lib/utils/errors': {
        NotFoundError: fakeNotFoundError,
        BundleError: fakeBundleError
      }
    };
    subject = builder(deps);
    fakeComponentsList = chance.pickset([
      chance.word(),
      chance.word(),
      chance.word(),
      chance.word()
    ], 2);

    it('returns an error', () => {
      result = subject(fakeComponentsList);

      return result.catch((error) => {
        expect(fakeNotFoundError).not.to.have.been.called;
        expect(fakeBundleError).to.have.been.calledWith(errorMessage);
        expect(error).to.be.an.instanceOf(Error);
      });
    });
  });
});
