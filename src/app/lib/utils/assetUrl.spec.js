//import { expect } from 'chai';
//import sinon from 'sinon';
//
//const sandbox = sinon.sandbox.create();
//const { assetUrl } = require('./assetUrl');
//
//describe('assetUrl', () => {
//  describe('config has an asset host', () => {
//    beforeEach(() => {
//      sandbox.stub(process, 'env', { TOGA_ASSETS_HOST: 'cdn.noths.com' });
//    });
//    afterEach(() => {
//      sandbox.restore();
//    });
//
//    it('returns a protocol-less url using the asset host', () => {
//      expect(assetUrl()).to.equal('//cdn.noths.com/toga-assets/');
//    });
//
//  });
//
//  describe('config has no asset host', () => {
//    it('returns as empty to load assets relatively', () => {
//      expect(assetUrl()).to.equal('');
//    });
//  });
//});
