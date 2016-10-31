const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./bundle');
import { fakePromisify, fakePromise, fakeResolve, fakeReject, fakeDebug } from '../../../../tests/commonMocks';

const fakeFile =  chance.file() ;
const fakeModulePaths = [ fakeFile ];
const fakeVendorBundleComponent = { name : chance.word(), file: fakeFile };
const fakeVendorFiles = { [chance.word()]: chance.word() };
const configMock = ()=> ({ vendor: {
  componentName:  fakeVendorBundleComponent.name,
  'bundle': fakeVendorFiles
} });

describe('runBundler', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const fakeComponentFiles = chance.file();
  const component = { name: chance.word(), file: fakeComponentFiles };
  const components = [component];
  const fakeIsoPlugin = chance.word();
  const fakeMapPath = chance.word();
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
  const fakeRunWebpack = fakePromise;

  beforeEach(() => {
    deps = {
      '/config/index': configMock,
      'es6-promisify': fakePromisify,
      'memory-fs': memoryFsMock,
      '/lib/webpack/index': fakeRunWebpack,
      '/lib/utils/componentHelper': {
        path: sandbox.stub().returns(fakeModulePaths),
        bundleId: sandbox.stub().returns(fakeMapPath)
      },
      'debug': fakeDebug
    };
    subject = builder(deps);
  });

  afterEach(()=>{
    sandbox.reset();
  });

  context('when the bundle is successful', () => {
    context('when styles do NOT exist', () => {
      it('returns a bundle object with js + css is undefined', () => {
        readdirSyncStub.returns(['components.js']);
        memoryFsMock.returns({
          readdirSync: readdirSyncStub,
          readFile : readFileStub,
          existsSync : existsSyncStub
        });
        deps['/lib/webpack/runWebpack'] = fakeResolve();
        deps['memory-fs'] = memoryFsMock;

        result = subject(components);
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            js: componentBundle,
            css: undefined,
            'css.map': undefined,
            'js.map': undefined
          });
        });
      });
    });

    context('when css exist', () => {
      it('returns a bundle object with js + css', () => {
        readdirSyncStub.returns(['components.js', 'components.css']);
        memoryFsMock.returns({
          readdirSync: readdirSyncStub,
          readFile : readFileStub,
          existsSync : existsSyncStub
        });
        deps['/lib/webpack/runWebpack'] = fakeResolve();
        deps['memory-fs'] = memoryFsMock;

        result = subject(components);
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            js: componentBundle,
            css: stylesBundle,
            'css.map': undefined,
            'js.map': undefined
          });
        });
      });
    });
    context('when map exist', () => {
      it('returns a bundle object with js + css', () => {
        readdirSyncStub.returns(['components.js', 'components.css', 'components.js.map', 'components.css.map']);
        memoryFsMock.returns({
          readdirSync: readdirSyncStub,
          readFile : readFileStub,
          existsSync : existsSyncStub
        });
        deps['/lib/webpack/runWebpack'] = fakeResolve();
        deps['memory-fs'] = memoryFsMock;

        result = subject(components);
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            js: componentBundle,
            css: stylesBundle,
            'css.map': stylesMapBundle,
            'js.map': componentMapBundle
          });
        });
      });
    });
  });

  context('when the bundle is not successful', () => {
    const failError = chance.word();
    beforeEach(() => {
      deps['/lib/webpack/runWebpack'] = fakeReject(failError);
      result = subject(components);
    });
    it('throws an error', () => {
      return result.catch((error) => {
        return expect(error).to.be.eq(failError);
      });
    });
  });

  describe('runWebpack options are passed correctly', () => {
    it('sets the isoPlugin', () => {
      result = subject([fakeVendorBundleComponent], { isoPlugin: fakeIsoPlugin });
      return result.then(()=>{
        expect(fakeRunWebpack).to.be.calledWith({
          externals: [],
          mapPath: fakeMapPath,
          minify: undefined,
          isoPlugin: fakeIsoPlugin,
          modulePaths: undefined,
          outputFileSystem: memoryFsMock(),
          componentFiles: [fakeFile]
        });
      });
    });
    it('sets the modulePaths', () => {
      result = subject([fakeVendorBundleComponent], { modulePaths: fakeModulePaths });
      return result.then(()=>{
        expect(fakeRunWebpack).to.be.calledWith({
          externals: [],
          mapPath: fakeMapPath,
          minify: undefined,
          isoPlugin: undefined,
          modulePaths: fakeModulePaths,
          outputFileSystem: memoryFsMock(),
          componentFiles: [fakeFile]
        });
      });
    });
    it('sets the externals webpack option if the component is vendor', () => {
      result = subject([fakeVendorBundleComponent]);
      return result.then(()=>{
        expect(fakeRunWebpack).to.be.calledWith({
          externals: [],
          mapPath: fakeMapPath,
          minify: undefined,
          isoPlugin: undefined,
          modulePaths: undefined,
          outputFileSystem: memoryFsMock(),
          componentFiles: [fakeFile]
        });
      });
    });

    it('minifies content', () => {
      result = subject(components, { minify: true });
      return result.then(() => {
        expect(fakeRunWebpack).to.be.calledWith({
          externals: fakeVendorFiles,
          minify: true,
          mapPath: fakeMapPath,
          isoPlugin: undefined,
          modulePaths: undefined,
          outputFileSystem: memoryFsMock(),
          componentFiles: [fakeComponentFiles]
        });
      });
    });
  });

  context('babel-polyfill', () => {
    const stubModulePath = chance.word();

    it('added to non vendor', () => {
      result = subject(components, { modulePaths: [stubModulePath] });
      return result.then(() => {
        expect(fakeRunWebpack).to.be.calledWith(sinon.match({ modulePaths: ['babel-polyfill', stubModulePath] }));
      });
    });

    it('not added to vendor', () => {
      const vendor = subject([fakeVendorBundleComponent], { modulePaths: [stubModulePath] });
      return vendor.then(() => {
        expect(fakeRunWebpack).to.be.calledWith(sinon.match({ modulePaths: [stubModulePath] }));
      });
    });
  });
});
