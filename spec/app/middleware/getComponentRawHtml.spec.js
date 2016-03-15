const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/middleware/getComponentRawHtml');

describe('getComponentRawHtml middleware', () => {
  const sandbox = sinon.sandbox.create();
  const fakeReq = {
    componentPath: '/fakeComponentPath',
    locale: 'fakeLocale'
  };
  const fakeRes = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  const renderComponentStub = sandbox.stub();
  const fakeRenderRawMarkup = 'render raw markup';
  const subject = builder({
    '/lib/renderComponent': renderComponentStub,
    '/views/component-raw': fakeRenderRawMarkup
  });

  afterEach(() => {
    sandbox.reset();
  });
  it('responds with the rendered component', () => {
    const fakeRenderedComponent = {};

    fakeRes.set.returns(fakeRes);
    renderComponentStub.returns(fakeRenderedComponent);
    subject(fakeReq, fakeRes);
    expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
    expect(fakeRes.send).to.have.been.calledWith(fakeRenderedComponent);
  });
});
