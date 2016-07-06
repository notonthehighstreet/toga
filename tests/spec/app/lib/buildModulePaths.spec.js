const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/buildModulePaths');

const componentsPath = chance.word();
const components = [chance.word(), chance.word()];

const sandbox = sinon.sandbox.create();
let subject;

describe('buildBundleId', () => {
  beforeEach(() => {
    subject = builder({
      '/lib/getAppConfig': sandbox.stub().returns({componentsPath})
    });
  });

  it('should return array of module paths for components', () => {
    const paths = subject(components);
    expect(paths).to.deep.eq([`${componentsPath}/${components[0]}/index.js`, `${componentsPath}/${components[1]}/index.js`]);
  });
});
