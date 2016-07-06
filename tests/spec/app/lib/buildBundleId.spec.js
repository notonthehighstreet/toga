const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/buildBundleId');

const component1 = chance.word();
const component2 = chance.word();
const components = [component1, component2];

const sandbox = sinon.sandbox.create();
let subject;

const modulePathStub = [`path/${component1}/index.js`, `path/${component2}/index.js`];

describe('buildBundleId', () => {

  beforeEach(() => {
    subject = builder({
      '/lib/buildModulePaths': sandbox.stub().returns(modulePathStub)
    });
  });

  it('when passing 2 components should concat them', () => {
    const minify = false;
    const bundleId  = subject(components, minify);
    expect(bundleId).to.deep.eq({bundleId: `${component1}__${component2}`, modulePaths:[`path/${component1}/index.js`, `path/${component2}/index.js`]});
  });

  it('should add .min to bundle id when minify true', () => {
    const minify = true;
    const bundleId  = subject(components, minify);
    expect(bundleId).to.deep.eq({bundleId: `${component1}__${component2}.min`, modulePaths:[`path/${component1}/index.js`, `path/${component2}/index.js`]});
  });
});
