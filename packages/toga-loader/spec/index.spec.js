const { expect } = require('chai');
const chance = new require('chance')();
const mock = require('mock-require');
const sinon = require('sinon');

describe('Toga Loader', () => {
  const componentName = 'componentName';
  const componentPath = `1/2/${componentName}/4`;
  const entryComponentPath = `1/2/${componentName}`;
  const sandbox = sinon.sandbox.create();
  const fakePath = {
    join: function() {}
  };
  const fakeFs = {
    readFileSync: sandbox.stub()
  };
  const fakeLoaderUtils = {
    getRemainingRequest: sandbox.stub()
  };
  const context = {
    options: {
      entry: {
        components: []
      }
    }
  };
  const bootstrapperContents = chance.word();
  let subject;

  fakeFs.readFileSync.returns(bootstrapperContents);
  fakeLoaderUtils.getRemainingRequest.returns(componentPath);
  beforeEach(() => {
    context.options.entry.components[0] = entryComponentPath;
    mock('fs', fakeFs);
    mock('path', fakePath);
    mock('loader-utils', fakeLoaderUtils);
    subject = require('../src/index');
  });
  afterEach(() => {
    mock.stopAll();
    sandbox.reset();
  });
  it('returns pristine source if source component is nested inside another component', () => {
    const source = chance.word();
    context.options.entry.components[0] = '1/2/anotherComponentName';
    const result = subject.call(context, source);

    expect(result).to.be.eq(source);
  });
  it('returns pristine source if source is not a string', () => {
    const source = chance.integer();
    const result = subject.call(context, source);

    expect(result).to.be.eq(source);
  });
  describe('source is not a nested component and is a string', () => {
    const source = `module.exports = ${chance.word()}`;
    let result;

    beforeEach(() => {
      result = subject.call(context, source);
    });
    it('replaces `module.exports` with `let togaComponentSource`', () => {
      const expectedMatcher = /^let togaComponentSource = /g;

      expect(result).to.match(expectedMatcher);
    });
    it('assigns `entryComponentName` to `togaComponentName`', () => {
      const expectedMatcher = new RegExp(`let togaComponentName="${componentName}"`);

      expect(result).to.match(expectedMatcher);
    });
    it('appends bootstrapper.js contents', () => {
      const expectedMatcher = new RegExp(`${bootstrapperContents}$`);

      expect(result).to.match(expectedMatcher);
    });
  });
});
