const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/getComponentHtml');
import Chance from 'chance';
import { fakeResolve } from '../../commonMocks';

const chance = new Chance();

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
  const fakeRenderOptions = { };
  const rawRenderResposne = chance.word();
  const testRenderResposne = chance.word();
  const renderComponentStub = fakeResolve(fakeRenderOptions);
  const fakeRenderRawMarkup = sandbox.stub().returns(rawRenderResposne);
  const fakeRenderTestMarkup = sandbox.stub().returns(testRenderResposne);
  const NotFoundError = sandbox.stub();
  const subject = builder({
    '/lib/renderComponent': renderComponentStub,
    '/views/component-raw': fakeRenderRawMarkup,
    '/views/component-test': fakeRenderTestMarkup,
    '/lib/utils/errors': { NotFoundError }
  });

  afterEach(() => {
    sandbox.reset();
  });
  it('responds with the rendered raw component', () => {
    fakeReq.path = 'some.html';
    fakeRes.set.returns(fakeRes);
    const result = subject(fakeReq, fakeRes);
    return result.then(()=> {
      expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
      expect(fakeRes.send).to.have.been.calledWith(testRenderResposne);
      expect(fakeRenderTestMarkup).to.have.been.calledWith(fakeRenderOptions);
      expect(renderComponentStub).to.have.been.calledWith({ componentName, context: { locale: fakeReq.locale }});
    });
  });

  it('responds with the rendered test component', () => {
    fakeReq.path = 'some.raw.html';
    fakeRes.set.returns(fakeRes);
    return subject(fakeReq, fakeRes).then(()=> {
      expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
      expect(fakeRes.send).to.have.been.calledWith(rawRenderResposne);
      expect(fakeRenderRawMarkup).to.have.been.calledWith(fakeRenderOptions);
      expect(renderComponentStub).to.have.been.calledWith({ componentName, context: { locale: fakeReq.locale }});
    });
  });
});
