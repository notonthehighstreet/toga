const expect = require('chai').expect;
const sinon = require('sinon');
import Chance from 'chance';
const chance = new Chance();
const builder = require('../../../../app/middleware/getComponentAsset');

const sandbox = sinon.sandbox.create();
const bundlerGetAssetsStub = sandbox.stub();
const bundlerStub = sandbox.stub();
const fakeRequest = {
  params: {},
  path: '',
  components: 'components'
};
const fakeResponse = {
  set: sandbox.stub(),
  send: sandbox.stub()
};
fakeResponse.set.returns(fakeResponse);
const NotFoundError = sandbox.stub();

describe('getComponentAssets', () => {
  let nextSpy;
  let bundleContent;

  const subject = builder({
    '/lib/bundler/index': bundlerStub,
    '/lib/utils/errors': { NotFoundError }
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

  const assetType = chance.word();

  context('is successfully returned', () => {
    it('bundles content and responds with that content', () => {
      delete fakeRequest.minify ;
      fakeRequest.assetType = assetType;
      const result = subject(fakeRequest, fakeResponse, nextSpy);
      return result.then(() => {
        return [
          expect(bundlerStub).to.have.been.calledWith(fakeRequest.components, { minify: undefined }),
          expect(bundlerGetAssetsStub).to.have.been.calledWith(assetType),
          expect(fakeResponse.send).to.be.calledWith(bundleContent)
        ];
      });
    });

    it('bundles minified content and responds with that content', () => {
      fakeRequest.minify = true;
      fakeRequest.assetType = assetType;
      const result = subject(fakeRequest, fakeResponse, nextSpy);
      return result.then(() => {
        return [
          expect(bundlerStub).to.have.been.calledWith(fakeRequest.components, { minify: true }),
          expect(bundlerGetAssetsStub).to.have.been.calledWith(assetType),
          expect(fakeResponse.send).to.be.calledWith(bundleContent)
        ];
      });
    });
  });

  context('is not successfully returned', () => {
    it('propagates error', () => {
      bundlerGetAssetsStub.returns(Promise.reject(NotFoundError));
      bundlerStub.returns({ getAsset: bundlerGetAssetsStub });
      const result = subject(fakeRequest, fakeResponse, nextSpy);

      return result.then(() => {
        expect(nextSpy.calledOnce).to.equal(true);
        let firstCallArguments = nextSpy.args[0];
        return expect(firstCallArguments[0]).to.equal(NotFoundError);
      });
    });
  });

  it('sets the correct context-type for javascript', () => {
    fakeRequest.assetType = 'js';
    const result = subject(fakeRequest, fakeResponse, nextSpy);
    return result.then(() => {
      return [
        expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'application/javascript')
      ];
    });
  });

  it('sets the correct context-type for css', () => {
    fakeRequest.assetType = 'css';
    const result = subject(fakeRequest, fakeResponse, nextSpy);
    return result.then(() => {
      return [
        expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'text/css')
      ];
    });
  });
});
