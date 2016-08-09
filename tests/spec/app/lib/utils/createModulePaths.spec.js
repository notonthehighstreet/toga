const expect = require('chai').expect;
const chance = new require('chance')();
const builder = require('../../../../../app/lib/utils/componentHelper');
let subject;

const fakePath = chance.word();
const fakeGetAppConfig = () => {
  return {componentsPath: fakePath};
};

const deps = {
  '/lib/getAppConfig': fakeGetAppConfig
};

describe('component helper path', () => {

  beforeEach(() => {
    subject = builder(deps).path;
  });

  it('should build path for single component', () => {
    const randomComponentString = chance.word();
    const componentPath = subject(randomComponentString);
    expect(componentPath).to.deep.equal([`${fakePath}/${randomComponentString}/index.js`]);
  });

  it('should build paths for multiple components', () => {
    const component1 = chance.word();
    const component2 = chance.word();
    const componentsArray = [component1, component2 ];
    const componentsPaths = subject(componentsArray);

    expect(componentsPaths).to.deep.equal([`${fakePath}/${component1}/index.js`, `${fakePath}/${component2}/index.js`]);
  });
});
