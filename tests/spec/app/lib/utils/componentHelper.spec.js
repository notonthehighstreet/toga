const expect = require('chai').expect;
const chance = new require('chance')();
const builder = require('../../../../../app/lib/utils/componentHelper');
let subject;

describe('component helper path', () => {

  beforeEach(() => {
    subject = builder().bundleId;
  });

  it('should build path for single component', () => {
    const randomComponentString = chance.word();
    const componentPath = subject(randomComponentString);
    expect(componentPath).to.deep.eq(randomComponentString);
  });

  it('should build paths for multiple components', () => {
    const component1 = chance.word();
    const component2 = chance.word();
    const componentsArray = [component1, component2 ];
    const componentsPaths = subject(componentsArray);

    expect(componentsPaths).to.deep.equal(`${component1}__${component2}`);
  });

  it('should build path including minified suffix ', () => {
    const randomComponentString = chance.word();
    const componentPath = subject(randomComponentString, {minify: true});
    expect(componentPath).to.deep.eq(randomComponentString + '.min');
  });
});
