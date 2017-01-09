import { expect } from 'chai';
import sinon from 'sinon';

const sandbox = sinon.sandbox.create();
const { assetsPrefix, assetsHost } = require('./assets');
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

describe('assetsPrefix', () => {
  describe('without TOGA_ASSETS_HOST set', () => {
    it('returns empty string', () => {
      expect(assetsPrefix()).to.equal('');
    });
  });
  describe('with TOGA_ASSETS_HOST set', () => {
    beforeEach(() => {
      sandbox.stub(process, 'env', { TOGA_ASSETS_HOST: 'cdn.noths.com' });
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('returns toga assets prefix', () => {
      expect(assetsPrefix()).to.equal('toga_assets/');
    });
  });
});
