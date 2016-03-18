const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/cssBundler/sass/compile');

describe('addPrefixes', () => {
  const sandbox = sinon.sandbox.create();
  const cssContent = chance.word();
  const promisifyStub = sandbox.stub();
  const renderSuccess = () => {
    return Promise.resolve({
      css: cssContent
    });
  };
  let deps;
  let subject;

  beforeEach(() => {
    deps = {
      'es6-promisify': promisifyStub,
      'node-sass': {}
    };
    promisifyStub.returns(renderSuccess);
    subject = builder(deps);
  });
  describe('when SCSS content is passed', () => {
    it('renders and returns parsed CSS', () => {
      const result = subject({});

      return result.then((compiledCss) => {
        return expect(compiledCss).to.be.eq(cssContent);
      });
    });
  });
});
