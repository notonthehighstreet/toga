const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const proxyquire = require('proxyquire');

const sandbox = sinon.sandbox.create();
const createConfigMock = sandbox.spy();
const fakeWebpack  = sandbox.stub().returns({
  run: (callback) => callback()
});

const webpackFailureError = chance.word();
const webpackFailureMock = sandbox.stub().returns({
  run: (callback) => callback(webpackFailureError)
});

describe('webpack/index', () => {
  let subject;

  beforeEach(() => {
    subject = proxyquire('./index', {
      './createWebpackConfig': createConfigMock,
      'webpack': fakeWebpack
    });
  });

  afterEach(()=>{
    sandbox.reset();
  });

  context('when the bundle is successful', () => {
    it('passes through options', () => {
      return subject({
        minify: false
      }).then(() => {
        expect(createConfigMock).to.be.calledWith({
          minify: false
        });
      });
    });
  });

  context('when the bundle is not successful', () => {
    beforeEach(() => {
      subject = proxyquire('./index', {
        './createWebpackConfig': createConfigMock,
        'webpack': webpackFailureMock
      });
    });

    it('throws an error', () => {
      return subject({}).catch((error) => {
        return expect(error).to.be.eq(webpackFailureError);
      });
    });
  });

  describe('webpack options are passed correctly', () => {
    it('minifies content', () => {
      return subject({ minify: true }).then(() => {
        const configArg = createConfigMock.lastCall.args[0];
        expect(configArg.minify).to.equal(true);
      });
    });
  });
});
