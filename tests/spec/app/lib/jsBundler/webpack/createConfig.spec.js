const builder = require('../../../../../../app/lib/jsBundler/webpack/createConfig');
const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();
const sandbox = sinon.sandbox.create();
const fakeWebpack = {
  optimize: {
    CommonsChunkPlugin: function() {},
    DedupePlugin: function() {},
    OccurrenceOrderPlugin: function() {},
    UglifyJsPlugin: function() {}
  },
  DefinePlugin: function() {}
};
const fakeGetAppConfig = sandbox.stub();
const fakeExtractTextPluging = () => {};
fakeExtractTextPluging.extract = () => {};

describe('Create Webpack Config', () => {
  let subject;
  const definePluginSpy = sandbox.spy(fakeWebpack, 'DefinePlugin');
  const uglifyJsPluginSpy = sandbox.spy(fakeWebpack.optimize, 'UglifyJsPlugin');

  beforeEach(() => {
    subject = builder({
      '/constants': chance.word(),
      webpack: fakeWebpack,
      'extract-text-webpack-plugin': fakeExtractTextPluging,
      '/lib/getAppConfig': fakeGetAppConfig
    });
    fakeGetAppConfig.returns({
      minify: false
    });
  });
  afterEach(() => {
    sandbox.reset();
  });
  after(() => {
    sandbox.restore();
  });

  context('when definitions are passed', () => {
    it('creates config object with definitions', () => {
      const fakeDefinitions = {
        [chance.word()]: chance.word()
      };
      const result = subject({
        modulePaths: [],
        definitions: fakeDefinitions,
        vendorBundleFileName: chance.word()
      });

      expect(definePluginSpy).to.have.been.calledWith(fakeDefinitions);
      expect(result.plugins[4]).to.be.an.instanceof(fakeWebpack.DefinePlugin);
    });
  });

  context('when definitions are not passed', () => {
    it('creates config object without definitions', () => {
      subject({
        modulePaths: [],
        vendorBundleFileName: chance.word()
      });
      expect(definePluginSpy).not.to.have.been.called;
    });
  });
  
  context('when in non-minify mode', () => {
    it('creates config without UglifyJs plugin', () => {
      subject({
        modulePaths: [],
        vendorBundleFileName: chance.word()
      });
      expect(uglifyJsPluginSpy).not.to.have.been.called;
    });
  });

  context('when in minify mode', () => {
    it('creates config with UglifyJs plugin', () => {
      fakeGetAppConfig.returns({
        minify: true
      });
      const result = subject({
        modulePaths: [],
        vendorBundleFileName: chance.word()
      });
      expect(uglifyJsPluginSpy).to.have.been.calledOnce;
      expect(result.plugins[4]).to.be.an.instanceof(fakeWebpack.optimize.UglifyJsPlugin);
    });
  });
});
