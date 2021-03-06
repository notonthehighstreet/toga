const { expect } = require('chai');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const Chance = require('chance');
const chance = new Chance();
const proxyquire = require('proxyquire');

const fakeWebpack = {
  LoaderOptionsPlugin: sandbox.spy(),
  HashedModuleIdsPlugin: sandbox.spy(),
  optimize: {
    UglifyJsPlugin: sandbox.spy(),
    CommonsChunkPlugin: sandbox.spy()
  },
  DefinePlugin: sandbox.spy()
};
const fakeAutoPrefixerResult = chance.word();
const fakeAssetsPlugin = sandbox.stub();
const fakeExtractPlugin = sandbox.stub();
const fakeExtractTextPlugin = sandbox.stub().returns({extract: fakeExtractPlugin });
const fakeAutoPrefixer = sandbox.stub().returns(fakeAutoPrefixerResult);
const createWebpackConfig = proxyquire('./createWebpackConfig',  {
  'webpack': fakeWebpack,
  'extract-text-webpack-plugin': fakeExtractTextPlugin,
  'assets-webpack-plugin': fakeAssetsPlugin,
  'autoprefixer': fakeAutoPrefixer
});

const resetEnvs = () => {
  delete process.env.TOGA_BASE_URL_LIST;
  delete process.env.TOGA_BASE_URL_CART;
  delete process.env.NOT_TOGA_BASE_URL;
  delete process.env.TOGA_ENVIRONMENT;
};

describe('Create Webpack Config', () => {

  beforeEach(() => {

  });
  afterEach(() => {
    resetEnvs();
    sandbox.reset();
  });
  after(() => {
    sandbox.restore();
  });

  it('creates a basic config', () => {
    const config = createWebpackConfig({
    });
    expect(config.plugins.length).to.equal(8);
  });

  it('has sourceMaps enabled', () => {
    const config = createWebpackConfig({
    });
    expect(config.devtool).to.equal('source-map');
  });

  it('has CommonsChunkPlugin enabled to ensure vendor files are extracted correctly', () => {
    const fakecommonsChunkName = chance.word();
    createWebpackConfig({ commonsChunkName: fakecommonsChunkName });
    expect(fakeWebpack.optimize.CommonsChunkPlugin).to.have.been.calledOnce;
    expect(fakeWebpack.optimize.CommonsChunkPlugin).to.be.calledWith(
      { name: fakecommonsChunkName, filename: '[name]-[chunkhash].js',  minChunks: Infinity}
    );
  });

  it('has ExtractTextPlugin enabled to ensure css files are generated correctly', () => {
    createWebpackConfig({ });
    expect(fakeExtractTextPlugin).to.have.been.calledOnce;
    expect(fakeExtractTextPlugin).to.be.calledWith({ filename: '[name]-[contenthash].css', allChunks: true });
  });

  it('has HashedModuleIdsPlugin enabled to ensure directory names are not leaked and files are referenced conistantly', () => {
    createWebpackConfig({ });
    expect(fakeWebpack.HashedModuleIdsPlugin).to.have.been.calledOnce;
  });

  it('has LoaderOptionsPlugin enabled to ensure postCSS is setup correctly', () => {
    createWebpackConfig({ });
    expect(fakeWebpack.LoaderOptionsPlugin).to.have.been.calledOnce;
    expect(fakeWebpack.LoaderOptionsPlugin).to.be.calledWith({ options: { postcss: [fakeAutoPrefixerResult] } });
  });

  context('when in non-minify mode', () => {
    it('creates config without .min in the filename', () => {
      const config = createWebpackConfig({ });
      expect(config.output.filename).to.equal('[name]-[chunkhash].js');
    });
    it('creates config without UglifyJs plugin', () => {
      createWebpackConfig({ });
      expect(fakeWebpack.optimize.UglifyJsPlugin).not.to.have.been.called;
    });
  });

  context('when in minify mode', () => {
    let config;

    beforeEach(()=>{
      config = createWebpackConfig({ minify: true });
    });

    it('creates config with .min in the filename', () => {
      expect(config.output.filename).to.equal('[name]-[chunkhash].min.js');
    });
    it('creates config with UglifyJs plugin', () => {
      expect(fakeWebpack.optimize.UglifyJsPlugin).to.have.been.calledOnce;
    });
    it('creates config with NODE_ENV set to production', () => {
      expect(fakeWebpack.DefinePlugin).to.be.calledWith({ 'process.env.NODE_ENV': JSON.stringify('production')  });
    });
  });

  context('when environment variables are passed in', () => {
    let originalEnv;
    let config; //eslint-disable-line
    beforeEach(()=>{
      originalEnv = Object.assign({}, process.env);
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('adds toga base urls to defineplugin', () => {
      resetEnvs();
      process.env.TOGA_BASE_URL_CART = 'cartURL';
      config = createWebpackConfig({});

      expect(fakeWebpack.DefinePlugin).to.be.calledWith({ 'process.env.TOGA_BASE_URL_CART': JSON.stringify('cartURL')  });
    });

    it('does not add non-toga base urls', () => {
      resetEnvs();
      process.env.NOT_TOGA_BASE_URL_CART = 'envvar';
      config = createWebpackConfig({});

      expect(fakeWebpack.DefinePlugin).to.not.be.calledWith({ 'process.env.NOT_TOGA_BASE_URL_CART': JSON.stringify('envvar') });
    });

    it('adds multiple environment variables', () => {
      resetEnvs();
      process.env.TOGA_BASE_URL_CART = 'envvar';
      process.env.TOGA_BASE_URL_LIST = 'listvar';
      config = createWebpackConfig({});

      expect(fakeWebpack.DefinePlugin).to.be.calledWith({ 'process.env.TOGA_BASE_URL_CART': JSON.stringify('envvar'), 'process.env.TOGA_BASE_URL_LIST': JSON.stringify('listvar') });
    });

    it('adds baseurls and node_env to production with minify', () => {
      resetEnvs();
      process.env.TOGA_BASE_URL_CART = 'cartURL';
      config = createWebpackConfig({minify: true});

      expect(fakeWebpack.DefinePlugin).to.be.calledWith({ 'process.env.TOGA_BASE_URL_CART': JSON.stringify('cartURL'), 'process.env.NODE_ENV': JSON.stringify('production') });
    });

    it('adds process.env.TOGA_ENVIRONEMNT if added', () => {
      resetEnvs();
      process.env.TOGA_ENVIRONMENT = 'qa';
      config = createWebpackConfig({});

      expect(fakeWebpack.DefinePlugin).to.be.calledWith({ 'process.env.TOGA_ENVIRONMENT': JSON.stringify('qa')});
    });
  });
});
