const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/middleware/getComponentBundle');

describe('getComponentBundle', () => {
  const sandbox = sinon.sandbox.create();
  const getComponentBundleStub = sandbox.stub();
  const fakeReq = {
    componentsContext: 'fakeComponentContext',
    locale: 'fakeLocale'
  };
  const fakeRes = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  const nextSpy = sandbox.spy();
  const subject = builder({
    '/lib/jsBundler/getComponentBundle': getComponentBundleStub
  });

  afterEach(() => {
    sandbox.reset();
  });
  it('responds with bundled content if bundling was successful', () => {
    const bundleContent = {};
    const bundleContentPromise = new Promise((resolve) => {
      resolve(bundleContent);
    });
    let result;

    fakeRes.set.returns(fakeRes);
    getComponentBundleStub.returns(bundleContentPromise);
    result = subject(fakeReq, fakeRes, nextSpy);

    return result.then(() => {
      return expect(fakeRes.send.calledWith(bundleContent)).to.be.true;
    });
  });
  it('propagates error bundled content if bundling was unsuccessful', () => {
    const err = {};
    const bundleContentPromise = new Promise((resolve, reject) => {
      reject(err);
    });
    let result;

    fakeRes.set.returns(fakeRes);
    getComponentBundleStub.returns(bundleContentPromise);
    result = subject(fakeReq, fakeRes, nextSpy);

    return result.then(() => {
      return expect(nextSpy.calledWith(err)).to.be.true;
    });
  });
});
