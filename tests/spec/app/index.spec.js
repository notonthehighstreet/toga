import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import builder from '../../../app/index';
import { fakePath, fakeLogger, fakeDebug, fakePromise } from '../commonMocks';

const chance = new Chance();
const sandbox = sinon.sandbox.create();
const isoStub = sandbox.stub().returns({ server: ()=>{}});
const fakeCreateServer = sandbox.stub().returns({ listen: (a, b, cb) => cb() });

const fakeGetComponentNames = sandbox.stub().returns([chance.word(), chance.word()]);
const fakePreCacheComponentBundle = sandbox.spy();
const fakeCreateWebpackAssetsJson = sandbox.spy();

const subject = builder({
  '/createServer': fakeCreateServer,
  '/lib/preCacheComponentBundle': fakePreCacheComponentBundle,
  '/lib/preCacheBundleCacheHash': fakePromise,
  '/lib/getComponentNames': fakeGetComponentNames,
  '/lib/createWebpackAssetsJson': fakeCreateWebpackAssetsJson,
  '/logger': fakeLogger,
  '/lib/createIsoConfig': sandbox.stub(),
  'webpack-isomorphic-tools': isoStub,
  debug: fakeDebug,
  path: fakePath
});

describe('App index', () => {
  context('passes in the components', ()=> {
    it('to the preCacheComponentBundle function', () => {
      return subject({}).then(() => {
        expect(fakePreCacheComponentBundle).to.have.been.calledWith(fakeGetComponentNames());
      });
    });
    it('to the createWebpackAssetsJson function', () => {
      return subject({}).then(() => {
        expect(fakeCreateWebpackAssetsJson).to.have.been.calledWith(fakeGetComponentNames());
      });
    });
  });

  it('uses the isomorphic tools server', () => {
    return subject({}).then(() => {
      expect(isoStub).to.have.been.called;
    });
  });
});
