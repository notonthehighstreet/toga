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
  const fakeGetAppConfig = sandbox.stub();
  let fakeIncludePaths;
  let fakeStylesheetContent;
  let fakeRender;
  let deps;
  let subject;

  beforeEach(() => {
    deps = {
      'es6-promisify': promisifyStub,
      'node-sass': {},
      '/lib/getAppConfig': fakeGetAppConfig
    };
    fakeIncludePaths = chance.word();
    fakeStylesheetContent = chance.word();
    fakeRender = sandbox.stub();
    fakeGetAppConfig.returns({
      minify: false
    });
    promisifyStub.returns(fakeRender);
    fakeRender.returns({
      then: function() {}
    });
    subject = builder(deps);
  });
  afterEach(() => {
    sandbox.reset();
  });
  describe('when SCSS content is passed', () => {
    it('renders and returns parsed CSS', () => {
      promisifyStub.returns(renderSuccess);
      const result = subject({});

      return result.then((compiledCss) => {
        return expect(compiledCss).to.be.eq(cssContent);
      });
    });
  });
  describe('when in non-minify mode', () => {
    it('should set the output style to be nested', () => {
      const expectedOptions = {
        data: fakeStylesheetContent,
        includePaths: fakeIncludePaths,
        outputStyle: 'nested'
      };

      subject({
        stylesheetContent: fakeStylesheetContent,
        includePaths: fakeIncludePaths
      });
      expect(fakeRender).to.have.been.calledWith(expectedOptions);
    });
  });
  describe('when not in minify mode', () => {
    it('should set the output style to be compressed', () => {
      const expectedOptions = {
        data: fakeStylesheetContent,
        includePaths: fakeIncludePaths,
        outputStyle: 'compressed'
      };

      fakeGetAppConfig.returns({
        minify: true
      });
      subject({
        stylesheetContent: fakeStylesheetContent,
        includePaths: fakeIncludePaths
      });
      expect(fakeRender).to.have.been.calledWith(expectedOptions);

    });
  });
});
