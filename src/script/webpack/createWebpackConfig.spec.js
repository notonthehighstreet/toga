const { expect } = require('chai');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const proxyquire = require('proxyquire');

const fakeWebpack = {
  LoaderOptionsPlugin: sandbox.spy(),
  optimize: {
    UglifyJsPlugin: sandbox.spy(),
    CommonsChunkPlugin: sandbox.spy()
  },
  DefinePlugin: sandbox.spy()
};
const fakeAssetsPlugin = sandbox.stub();
const fakeExtractTextPlugin = sandbox.stub();
const fakeAutoPrefixer = sandbox.stub();
const createWebpackConfig = proxyquire('./createWebpackConfig',  {
  'webpack': fakeWebpack,
  'extract-text-webpack-plugin': sandbox.stub().returns({extract: fakeExtractTextPlugin }),
  'assets-webpack-plugin': fakeAssetsPlugin,
  'autoprefixer': fakeAutoPrefixer
});

describe('Create Webpack Config', () => {

  beforeEach(() => {
  });
  afterEach(() => {
    sandbox.reset();
  });
  after(() => {
    sandbox.restore();
  });

  it('creates a basic config', () => {
    const config = createWebpackConfig({
    });
    expect(config.plugins.length).to.equal(5);
  });

  it('has sourceMaps enabled', () => {
    const config = createWebpackConfig({
    });
    expect(config.devtool).to.equal('source-map');
  });

  it('has CommonsChunkPlugin enabled', () => {
    createWebpackConfig({ });
    expect(fakeWebpack.optimize.CommonsChunkPlugin).to.have.been.calledOnce;
  });

  context('when in non-minify mode', () => {
    it('creates config without UglifyJs plugin', () => {
      createWebpackConfig({ });
      expect(fakeWebpack.optimize.UglifyJsPlugin).not.to.have.been.called;
    });
  });

  context('when in minify mode', () => {
    it('creates config with UglifyJs plugin', () => {
      createWebpackConfig({
        minify: true
      });
      expect(fakeWebpack.optimize.UglifyJsPlugin).to.have.been.calledOnce;
    });
    it('creates config with NODE_ENV set to production', () => {
      createWebpackConfig({
        minify: true
      });
      expect(fakeWebpack.DefinePlugin).to.be.calledWith({ 'process.env.NODE_ENV': JSON.stringify('production')  });
    });
  });
});
