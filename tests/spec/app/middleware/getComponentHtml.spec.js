const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/getComponentHtml');

describe('getComponentRawHtml middleware', () => {
  const sandbox = sinon.sandbox.create();
  const componentName = 'fakeComponentPath';
  const fakeReq = {
    componentPath: '/' + componentName,
    locale: 'fakeLocale'
  };
  const fakeRes = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };
  const renderComponentStub = sandbox.stub();
  const fakeRenderRawMarkup = sandbox.spy();
  const fakeRenderTestMarkup = sandbox.spy();
  const subject = builder({
    '/lib/renderComponent': renderComponentStub,
    '/views/component-raw': fakeRenderRawMarkup,
    '/views/component-test': fakeRenderTestMarkup
  });

  afterEach(() => {
    sandbox.reset();
  });
  it('responds with the rendered raw component', () => {
    const fakeRenderedComponent = {};
    fakeReq.path = 'some.html';
    fakeRes.set.returns(fakeRes);
    renderComponentStub.returns(fakeRenderedComponent);
    subject(fakeReq, fakeRes);
    expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
    expect(fakeRes.send).to.have.been.calledWith(fakeRenderedComponent);
    expect(renderComponentStub).to.have.been.calledWith({ componentName, context: { locale: fakeReq.locale }}, fakeRenderTestMarkup);
  });

  it('responds with the rendered test component', () => {
    const fakeRenderedComponent = {};
    fakeReq.path = 'some.raw.html';
    fakeRes.set.returns(fakeRes);
    renderComponentStub.returns(fakeRenderedComponent);
    subject(fakeReq, fakeRes);
    expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
    expect(fakeRes.send).to.have.been.calledWith(fakeRenderedComponent);
    expect(renderComponentStub).to.have.been.calledWith({ componentName, context: { locale: fakeReq.locale }}, fakeRenderRawMarkup);
  });
});
