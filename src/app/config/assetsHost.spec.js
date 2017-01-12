import { expect } from 'chai';
import sinon from 'sinon';

const sandbox = sinon.sandbox.create();
const assetsHost = require('./assetsHost');
const localServer = require('./server');

describe('assetsHost', () => {
  describe('without TOGA_ASSETS_HOST set', () => {
    it('returns the local server host and port', () => {
      expect(assetsHost()).to.equal(`${localServer.host}:${localServer.port}`);
    });
  });
  describe('with TOGA_ASSETS_HOST set', () => {
    beforeEach(() => {
      sandbox.stub(process, 'env', { TOGA_ASSETS_HOST: 'cdn.noths.com' });
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('returns TOGA_ASSETS_HOST host', () => {
      expect(assetsHost()).to.equal('cdn.noths.com');
    });
  });
});
