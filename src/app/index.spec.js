import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import builder from './index';
import { fakeLogger, fakeDebug, fakePromise } from '../../tests/commonMocks';

const chance = new Chance();
const sandbox = sinon.sandbox.create();
const fakeCreateServer = sandbox.stub().returns({ listen: (a, b, cb) => cb() });

const fakeGetComponentInfo = sandbox.stub().returns([chance.word(), chance.word()]);
const universalServerStub = sandbox.stub();
const assetsJsonStub = fakePromise;
const fakeUniversalRendering = sandbox.stub().returns({
  server: universalServerStub,
  createAssetsJson: assetsJsonStub
});

const subject = builder({
  '/createServer': fakeCreateServer,
  '/lib/getComponentInfo': fakeGetComponentInfo,
  '/lib/universalRendering/index': fakeUniversalRendering,
  '/logger': fakeLogger,
  debug: fakeDebug,
  path: require('path')
});

describe('App index', () => {
  context('passes in the components', ()=> {
    it('to the createWebpackAssetsJson function', () => {
      return subject({}).then(() => {
        expect(assetsJsonStub).to.have.been.calledWith(fakeGetComponentInfo());
      });
    });
  });

  it('uses the isomorphic tools server', () => {
    return subject({}).then(() => {
      expect(universalServerStub).to.have.been.calledWith(process.cwd(), undefined);
    });
  });

  it('uses the express server', () => {
    return subject({}).then(() => {
      expect(fakeCreateServer).to.have.been.called;
    });
  });
});
