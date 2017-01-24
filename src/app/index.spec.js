import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import builder from './index';
import { fakeLogger, fakeDebug } from '../../tests/commonMocks';

const chance = new Chance();
const sandbox = sinon.sandbox.create();
const fakeCreateServer = sandbox.stub().returns({ listen: (a, b, cb) => cb() });

const fakeGetComponentInfo = sandbox.stub().returns([chance.word(), chance.word()]);
const subject = builder({
  '/createServer': fakeCreateServer,
  '/lib/getComponentInfo': fakeGetComponentInfo,
  '/logger': fakeLogger,
  'webpack-isomorphic-tools': require('webpack-isomorphic-tools'),
  debug: fakeDebug,
  path: require('path')
});

describe('App index', () => {
  it('uses the express server', () => {
    return subject({}).then(() => {
      expect(fakeCreateServer).to.have.been.called;
    });
  });
});
