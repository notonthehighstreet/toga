const { expect } = require('chai');
const chance = new require('chance')();
const mock = require('mock-require');
const sinon = require('sinon');

describe('Toga Loader', () => {
  const componentName = 'componentName';
  const componentPath = `1/2/${componentName}/4`;
  const entryComponentPath = `1/2/${componentName}`;
  const sandbox = sinon.sandbox.create();
  const bootstrapper = `const elems = document.querySelectorAll('[toga=${componentName}]');
      [].forEach.call(elems, function(elem) {
        let props;
        try {
          props = JSON.parse(elem.getAttribute('props'));
        } catch (e) {
          props = {};
        }
        const Component = (typeof exports.default === 'undefined') 
            ? module.exports 
            : exports.default;
        ReactDOM.render(<Component {...props}/>, elem);
      });`;
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
  describe('bootstrap source with embeded source code', () => {
    it('returns source and bootstrap', () => {
      const source = chance.word();
      context.options.entry.components[0] = '1/2/anotherComponentName';
      const result = subject.call(context, source);

      expect(result).to.include(source);
      expect(result).to.include(bootstrapper);
    });
  });

});
