const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/bundler/bundle');
import { fakePromisify, fakePromise, fakeResolve, fakeReject, fakeDebug } from '../../../commonMocks';

describe('runBundler', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  const component = chance.word();
  const componentBundle = 'component bundle';
  const stylesBundle = 'styles bundle';
  const readFileStub = sandbox.stub();
  const existsSyncStub = sandbox.stub();
  const memoryFsMock = sandbox.stub();
  readFileStub.withArgs('/components.js', 'utf8').returns(Promise.resolve(componentBundle));
  readFileStub.withArgs('/components.css', 'utf8').returns(Promise.resolve(stylesBundle));
  memoryFsMock.returns({
    readFile : readFileStub,
    existsSync : existsSyncStub
  });
  const fakeModulePaths = [ chance.file() ];
  const fakeRunWebpack = fakePromise;

  beforeEach(() => {
    deps = {
      'es6-promisify': fakePromisify,
      'memory-fs': memoryFsMock,
      '/lib/webpack/index': fakeRunWebpack,
      '/lib/utils/createModulePaths': () => fakeModulePaths,
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
        existsSyncStub.withArgs('/components.css').returns(false);
        deps['/lib/webpack/runWebpack'] = fakeResolve();
        result = subject(component);
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            js: componentBundle,
            css: undefined
          });
        });
      });
    });
    context('when css exist', () => {
      it('returns a bundle object with js + css', () => {
        existsSyncStub.withArgs('/components.css').returns(true);
        deps['/lib/webpack/runWebpack'] = fakeResolve();
        result = subject(component);
        return result.then((bundle) => {
          return expect(bundle).to.be.deep.eq({
            js: componentBundle,
            css: stylesBundle
          });
        });
      });
    });
  });

  context('when the bundle is not successful', () => {
    const failError = chance.word();
    beforeEach(() => {
      deps['/lib/webpack/runWebpack'] = fakeReject(failError);
      result = subject(component);
    });
    it('throws an error', () => {
      return result.catch((error) => {
        return expect(error).to.be.eq(failError);
      });
    });
  });

  describe('runWebpack options are passed correctly', () => {
    it('minifies content', () => {
      result = subject(component, { minify: true });
      return result.then(() => {
        expect(fakeRunWebpack).to.be.calledWith(component, {
          minify: true,
          modulePaths: fakeModulePaths,
          outputFileSystem: memoryFsMock()
        });
      });
    });
  });
});
