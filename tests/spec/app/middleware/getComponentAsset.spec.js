const expect = require('chai').expect;
const sinon = require('sinon');
import Chance from 'chance';
const chance = new Chance();
const builder = require('../../../../app/middleware/getComponentAsset');

const sandbox = sinon.sandbox.create();
const bundlerGetAssetsStub = sandbox.stub();
const bundlerStub = sandbox.stub();
const fakeRequest = {
  path: '',
  components: 'components'
};
const fakeResponse = {
  set: sandbox.stub(),
  send: sandbox.stub()
};
fakeResponse.set.returns(fakeResponse);
const NotFoundError =sandbox.stub();

describe('getComponentAssets', () => {
  let nextSpy;
  let bundleContent;

  const subject = builder({
    '/lib/bundler/index': bundlerStub,
    '/middleware/errors/index': { NotFoundError }
  });

  beforeEach(() => {
    nextSpy = sandbox.spy();
    bundleContent = chance.word();
    bundlerGetAssetsStub.returns(Promise.resolve(bundleContent));
    bundlerStub.returns({ getAsset: bundlerGetAssetsStub });
  });

  afterEach(() => {
    sandbox.reset();
  });

  context('when the component js', () => {
    const assetType = 'js';
    const jsSubject = subject(assetType);
    context('is successfully returned', () => {
      it('bundles content and responds with that content', () => {
        fakeRequest.path = 'some.js';
        const result = jsSubject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          return [
            expect(bundlerStub).to.have.been.calledWith(fakeRequest.components, { minify: false }),
            expect(bundlerGetAssetsStub).to.have.been.calledWith(assetType),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'application/javascript'),
            expect(fakeResponse.send).to.be.calledWith(bundleContent)
          ];
        });
      });
      it('bundles minified content and responds with that content', () => {
        fakeRequest.path = 'some.min.js';
        const result = jsSubject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          return [
            expect(bundlerStub).to.have.been.calledWith(fakeRequest.components, { minify: true }),
            expect(bundlerGetAssetsStub).to.have.been.calledWith(assetType),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'application/javascript'),
            expect(fakeResponse.send).to.be.calledWith(bundleContent)
          ];
        });
      });
    });
    context('is not successfully returned', () => {
      it('propagates error', () => {
        const err = {};
        bundlerGetAssetsStub.returns(Promise.reject(err));
        bundlerStub.returns({ getAsset: bundlerGetAssetsStub });
        const result = jsSubject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          expect(nextSpy.calledOnce).to.equal(true);
          let firstCallArguments = nextSpy.args[0];
          return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
        });
      });
    });
  });

  context('when the component css', () => {
    const assetType = 'css';
    const cssSubject = subject(assetType);

    context('is successfully returned', () => {
      it('returns the components css', () => {
        fakeRequest.path = 'some.css';
        const result = cssSubject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(bundlerStub).to.have.been.calledWith(fakeRequest.components, { minify : false }),
            expect(bundlerGetAssetsStub).to.have.been.calledWith(assetType),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'text/css'),
            expect(fakeResponse.send).to.have.been.calledWith(bundleContent)
          ];
        });
      });
      it('returns the minified components css', () => {
        fakeRequest.path = 'some.min.css';
        const result = cssSubject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(bundlerStub).to.have.been.calledWith(fakeRequest.components, { minify : true }),
            expect(bundlerGetAssetsStub).to.have.been.calledWith(assetType),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'text/css'),
            expect(fakeResponse.send).to.have.been.calledWith(bundleContent)
          ];
        });
      });
    });
    context('is not successfully returned', () => {
      it('propagates error if bundling was unsuccessful', () => {
        const err = {};
        bundlerGetAssetsStub.returns(Promise.reject(err));
        bundlerStub.returns({ getAsset: bundlerGetAssetsStub });
        const result = cssSubject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          expect(nextSpy.calledOnce).to.equal(true);
          let firstCallArguments = nextSpy.args[0];
          return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
        });
      });
    });
  });
});
