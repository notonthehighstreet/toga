const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/getComponentAsset');
const fakeCss = 'some fake css';
const javascriptBundle = 'a javascript bundle';

describe('getComponentAssets', () => {
  const sandbox = sinon.sandbox.create();
  const getCachedComponentBundleStub = sandbox.stub();
  const fakeRequest = {
    path: '',
    components: 'components'
  };
  const fakeResponse = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  fakeResponse.set.returns(fakeResponse);
  const nextSpy = sandbox.spy();
  function NotFoundError() { }

  afterEach(() => {
    sandbox.reset();
  });

  context('when the component js', () => {
    const assetType = 'js';
    const bundleType = 'component';
    const getComponentBundleStub = sandbox.stub();
    const subject = builder({
      '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
      '/middleware/errors/notFoundError': NotFoundError
    })(assetType, bundleType);
    context('is successfully returned', () => {
      it('bundles content and responds with that content', () => {
        const bundleContent = {};
        const getCachedBundleContentPromise = Promise.reject();
        const bundleContentPromise = Promise.resolve(bundleContent);
        let result;
        fakeRequest.path = 'some.js';

        getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
        getComponentBundleStub.returns(bundleContentPromise);
        result = subject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          return [
            expect(getComponentBundleStub).to.have.been.calledWith(fakeRequest.components, bundleType, false),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'application/javascript'),
            expect(fakeResponse.send.calledWith(bundleContent)).to.be.true
          ];
        });
      });
      it('bundles minified content and responds with that content', () => {
        const bundleContent = {};
        const getCachedBundleContentPromise = Promise.reject();
        const bundleContentPromise = Promise.resolve(bundleContent);
        let result;
        fakeRequest.path = 'some.min.js';
        getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
        getComponentBundleStub.returns(bundleContentPromise);
        result = subject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          return [
            expect(getComponentBundleStub).to.have.been.calledWith(fakeRequest.components, bundleType, true),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'application/javascript'),
            expect(fakeResponse.send.calledWith(bundleContent)).to.be.true
          ];
        });
      });
    });
    context('is not successfully returned', () => {
      it('propagates error', () => {
        const err = {};
        const getCachedBundleContentPromise = Promise.reject();
        const bundleContentPromise = Promise.reject(err);
        let result;

        getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
        getComponentBundleStub.returns(bundleContentPromise);
        result = subject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          expect(nextSpy.calledOnce).to.be.true;
          let firstCallArguments = nextSpy.args[0];
          return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
        });
      });
    });
  });

  context('when the vendor js', () => {
    const bundleType = 'vendor';
    context('is successfully returned (from cache)', () => {
      const getComponentBundleStub = sandbox.stub().returns(Promise.resolve(javascriptBundle));
      const subject = builder({
        '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
        '/middleware/errors/notFoundError': NotFoundError
      })('js', bundleType);
      it('bundles content and responds with that content', () => {
        fakeRequest.path = 'some.js';
        const result = subject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(getComponentBundleStub).to.have.been.calledWith(fakeRequest.components, bundleType, false),
            expect(fakeResponse.send).to.be.calledWith(javascriptBundle),
            expect(fakeResponse.set).to.be.calledWith('Content-Type', 'application/javascript')
          ];
        });
      });
      it('bundles minified content and responds with that content', () => {
        fakeRequest.path = 'some.min.js';
        const result = subject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(getComponentBundleStub).to.have.been.calledWith(fakeRequest.components, bundleType, true),
            expect(fakeResponse.send).to.be.calledWith(javascriptBundle),
            expect(fakeResponse.set).to.be.calledWith('Content-Type', 'application/javascript')
          ];
        });
      });
    });
    context('is successfully returned (not from cache)', () => {
      const getComponentBundleStub = sandbox.stub().returns(Promise.resolve(javascriptBundle));
      const subject = builder({
        '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
        '/middleware/errors/notFoundError': NotFoundError
      })('js', bundleType);
      it('bundles content and responds with that content', () => {
        fakeRequest.path = 'some.js';
        const result = subject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(getComponentBundleStub).to.have.been.calledWith(fakeRequest.components, bundleType, false),
            expect(fakeResponse.send).to.be.calledWith(javascriptBundle),
            expect(fakeResponse.set).to.be.calledWith('Content-Type', 'application/javascript')
          ];
        });
      });
    });
    context('is not successfully returned', () => {
      const error = {};
      const getComponentBundleStub = sandbox.stub();
      const getVendorBundleMock = () => Promise.reject(error);
      const subject = builder({
        '/lib/jsBundler/getComponentBundle': getVendorBundleMock,
        '/middleware/errors/notFoundError': NotFoundError
      })('js', 'vendor');
      it('propagates error', () => {
        const err = {};
        const getCachedBundleContentPromise = Promise.reject();
        const bundleContentPromise = Promise.reject(err);
        let result;

        getCachedComponentBundleStub.returns(getCachedBundleContentPromise);
        getComponentBundleStub.returns(bundleContentPromise);
        result = subject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          expect(nextSpy.calledOnce).to.be.true;
          let firstCallArguments = nextSpy.args[0];
          return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
        });
      });
    });
  });

  context('when the component css', () => {
    let bundleContentPromise = Promise.resolve(fakeCss);
    const getComponentBundleStub = sandbox.stub();
    const bundleType = 'styles';
    const cssSubject = builder({
      '/lib/jsBundler/getComponentBundle': getComponentBundleStub,
      '/middleware/errors/notFoundError': NotFoundError
    })('css', bundleType);
    context('is successfully returned', () => {
      it('returns the components css', () => {
        fakeRequest.path = 'some.css';
        getComponentBundleStub.returns(bundleContentPromise);
        const result = cssSubject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(getComponentBundleStub).to.have.been.calledWith(fakeRequest.components, bundleType, false),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'text/css'),
            expect(fakeResponse.send).to.have.been.calledWith(fakeCss)
          ];
        });
      });
      it('returns the minified components css', () => {
        fakeRequest.path = 'some.min.css';
        getComponentBundleStub.returns(bundleContentPromise);
        const result = cssSubject(fakeRequest, fakeResponse, nextSpy);
        return result.then(() => {
          return [
            expect(getComponentBundleStub).to.have.been.calledWith(fakeRequest.components, bundleType, true),
            expect(fakeResponse.set).to.have.been.calledWith('Content-Type', 'text/css'),
            expect(fakeResponse.send).to.have.been.calledWith(fakeCss)
          ];
        });
      });
    });
    context('is not successfully returned', () => {
      it('propagates error if bundling was unsuccessful', () => {
        const err = {};
        bundleContentPromise = Promise.reject(err);
        let result;

        getComponentBundleStub.returns(bundleContentPromise);
        result = cssSubject(fakeRequest, fakeResponse, nextSpy);

        return result.then(() => {
          expect(nextSpy.calledOnce).to.be.true;
          let firstCallArguments = nextSpy.args[0];
          return expect(firstCallArguments[0] instanceof NotFoundError).to.be.true;
        });
      });
    });
  });
});
