const builder = require('./createWebpackConfig');
const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();
const fakeFileName = chance.word();
const sandbox = sinon.sandbox.create();
const fakeWebpack = {
  LoaderOptionsPlugin: function() {},
  optimize: {
    UglifyJsPlugin: function() {}
  },
  DefinePlugin: function() {}
};
const fakeAutoPrefixer = sandbox.stub();
const configMock = () => ({ minify: false });
const fakeExtractTextPluging = () => {};
fakeExtractTextPluging.extract = () => {};

describe('Create Webpack Config', () => {
  let subject;
  const definePluginSpy = sandbox.spy(fakeWebpack, 'DefinePlugin');
  const uglifyJsPluginSpy = sandbox.spy(fakeWebpack.optimize, 'UglifyJsPlugin');
  const fakeModulePaths = [];

  beforeEach(() => {
    subject = builder({
      webpack: fakeWebpack,
      autoprefixer: fakeAutoPrefixer,
      'extract-text-webpack-plugin': fakeExtractTextPluging,
      '/config/index': configMock
    });
  });
  afterEach(() => {
    sandbox.reset();
  });
  after(() => {
    sandbox.restore();
  });

  it('creates a basic config', () => {
    const config = subject({
      modulePaths: fakeModulePaths,
      filename: fakeFileName
    });
    expect(config.plugins.length).to.equal(2);
    expect(config.entry[fakeFileName]).to.equal(fakeModulePaths);
    expect(config.externals.length).to.eq(0);
  });

  it('has sourceMaps enabled', () => {
    const fakeMapPath = chance.word();
    const config = subject({
      mapPath: fakeMapPath
    });
    expect(config.devtool).to.equal('source-map');
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
      expect(result.plugins[2]).to.be.an.instanceof(fakeWebpack.DefinePlugin);
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
      const config = subject({
        modulePaths: [],
        minify: true
      });
      expect(uglifyJsPluginSpy).to.have.been.calledOnce;
      expect(config.plugins[2]).to.be.an.instanceof(fakeWebpack.optimize.UglifyJsPlugin);
    });
    it('creates config with NODE_ENV set to production', () => {
      const config = subject({
        modulePaths: [],
        minify: true
      });
      expect(config.plugins[3]).to.be.an.instanceof(fakeWebpack.DefinePlugin);
      expect(definePluginSpy).to.be.calledWith({ 'process.env.NODE_ENV': JSON.stringify('production')  });
    });
  });
});
