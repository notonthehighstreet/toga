const builder = require('../../../../../app/lib/webpack/createWebpackConfig');
const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();
const sandbox = sinon.sandbox.create();
const fakeWebpack = {
  optimize: {
    DedupePlugin: function() {},
    OccurrenceOrderPlugin: function() {},
    UglifyJsPlugin: function() {}
  },
  DefinePlugin: function() {}
};
const fakeIsoPluginSpy = sandbox.stub();
const fakeAutoPrefixer = sandbox.stub();
const fakeGetAppConfig = sandbox.stub();
const fakeExtractTextPluging = () => {};
fakeExtractTextPluging.extract = () => {};

describe('Create Webpack Config', () => {
  let subject;
  const definePluginSpy = sandbox.spy(fakeWebpack, 'DefinePlugin');
  const uglifyJsPluginSpy = sandbox.spy(fakeWebpack.optimize, 'UglifyJsPlugin');

  beforeEach(() => {
    subject = builder({
      webpack: fakeWebpack,
      autoprefixer: fakeAutoPrefixer,
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
        definitions: fakeDefinitions
      });

      expect(definePluginSpy).to.have.been.calledWith(fakeDefinitions);
      expect(result.plugins[3]).to.be.an.instanceof(fakeWebpack.DefinePlugin);
    });
  });

  context('when definitions are not passed', () => {
    it('creates config object without definitions', () => {
      subject({
        modulePaths: []
      });
      expect(definePluginSpy).not.to.have.been.called;
    });
  });

  context('when in non-minify mode', () => {
    it('creates config without UglifyJs plugin', () => {
      subject({
        modulePaths: []
      });
      expect(uglifyJsPluginSpy).not.to.have.been.called;
    });
  });

  context('when in minify mode', () => {
    it('creates config with UglifyJs plugin', () => {
      const result = subject({
        modulePaths: [],
        minify: true
      });
      expect(uglifyJsPluginSpy).to.have.been.calledOnce;
      expect(result.plugins[3]).to.be.an.instanceof(fakeWebpack.optimize.UglifyJsPlugin);
    });
    it('creates config with NODE_ENV set to production', () => {
      const result = subject({
        modulePaths: [],
        minify: true
      });
      expect(result.plugins[4]).to.be.an.instanceof(fakeWebpack.DefinePlugin);
      expect(definePluginSpy).to.be.calledWith({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } });
    });
  });

  context('when isoPlugin is NOT passed', () => {
    it('creates config without isoPlugin plugin', () => {
      const result = subject({
        modulePaths: []
      });
      expect(result.plugins.length).to.equal(3);
    });
  });

  context('when isoPlugin IS passes', () => {
    it('creates config with isoPlugin plugin', () => {
      const result = subject({
        modulePaths: [],
        isoPlugin: fakeIsoPluginSpy
      });
      expect(result.plugins.length).to.equal(4);
      expect(result.plugins[3]).to.equal(fakeIsoPluginSpy);
    });
  });
});
