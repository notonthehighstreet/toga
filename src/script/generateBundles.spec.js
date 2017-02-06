const { expect, assert } = require('chai');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const Chance = require('chance');
const chance = new Chance();
const proxyquire = require('proxyquire');

const fakeWebpack = sandbox.stub();
const fakeSsrHelper = sandbox.stub();
const fakeFs = { write: sandbox.stub() };

let generator;

describe.only('generateBundle', () => {

  beforeEach(() => {
    generator = proxyquire('./generateBundles',  {
      './webpack': fakeWebpack,
      './ssr-helper': fakeSsrHelper,
      'fs': fakeFs,
    });
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('is a promise', () => {
    return generator.then(() => {
      assert(true, 'Generate bundles should return a promise');
    }).catch(e => {
      assert(false, 'Generate bundles should return a promise');
      throw Error(e);
    });
  });

  it('runs webpack to bundle components', () => {

  });

  it('uses the ssr helper to prep for server-side requireing of image files', () => {

  });

  it('runs webpack to generate static bundles',  ()=>{

  });

});
