const bundles = require('../../../dist/components/asset-bundles.json');

const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('./componentHtml');
import Chance from 'chance';
import { fakeResolve } from '../../../tests/commonMocks';

const chance = new Chance();

describe('componentRawHtml middleware', () => {
  const sandbox = sinon.sandbox.create();
  const componentName = chance.word();
  const fakeReq = {
    componentName
  };
  const fakeRes = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };

  const fakeNext = sandbox.stub();
  const fakeRenderOptions = { some: 'option', bundles };
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

  describe('componentProps', () =>{
    it('passes props', () => {
      fakeReq.props = { [chance.word()]: chance.word() };
      fakeRes.set.returns(fakeRes);
      fakeReq.preview = true;
      fakeReq.url = chance.url();
      const result = subject.componentProps(fakeReq, fakeRes, fakeNext);
      return result.then(()=> {
        expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
        expect(fakeRes.send).to.have.been.calledWith(testRenderResposne);
        expect(fakeRenderTestMarkup).to.have.been.calledWith({ ...fakeRenderOptions });
        expect(renderComponentStub).to.have.been.calledWith({ componentName, componentData: { props: fakeReq.props }, url: fakeReq.url});
      });
    });

    it('responds with the rendered test component', () => {
      delete fakeReq.props;
      fakeReq.preview = true;
      fakeRes.set.returns(fakeRes);
      fakeReq.url = chance.url();
      const result = subject.componentProps(fakeReq, fakeRes, fakeNext);
      return result.then(()=> {
        expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
        expect(fakeRes.send).to.have.been.calledWith(testRenderResposne);
        expect(fakeRenderTestMarkup).to.have.been.calledWith({...fakeRenderOptions});
        expect(renderComponentStub).to.have.been.calledWith({ componentName, componentData: { props: undefined }, url: fakeReq.url});
      });
    });

    it('responds with the rendered raw component', () => {
      delete fakeReq.props;
      fakeReq.raw = true;
      fakeRes.set.returns(fakeRes);
      fakeReq.url = chance.url();
      return subject.componentProps(fakeReq, fakeRes, fakeNext).then(()=> {
        expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
        expect(fakeRes.send).to.have.been.calledWith(rawRenderResposne);
        expect(fakeRenderRawMarkup).to.have.been.calledWith({...fakeRenderOptions});
        expect(renderComponentStub).to.have.been.calledWith({ componentName, componentData: { props: undefined }, url: fakeReq.url });
      });
    });

    it('calls next when a static asset', () => {
      delete fakeReq.props;
      fakeReq.preview = false;
      fakeReq.raw = false;
      const result = subject.componentProps(fakeReq, fakeRes, fakeNext);
      return result.then(()=> {
        expect(fakeNext).to.have.been.calledOnce;
      });
    });
  });

  describe('componentData', () =>{
    it('passes body', () => {
      fakeReq.body = { [chance.word()]: chance.word() };
      fakeRes.set.returns(fakeRes);
      fakeReq.raw = true;
      fakeReq.url = chance.url();
      const result = subject.componentData(fakeReq, fakeRes, fakeNext);
      return result.then(()=> {
        expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
        expect(fakeRes.send).to.have.been.calledWith(rawRenderResposne);
        expect(renderComponentStub).to.have.been.calledWith({ componentName, url: fakeReq.url, componentData:{ data: fakeReq.body } });
        expect(fakeRenderRawMarkup).to.have.been.calledWith({ ...fakeRenderOptions });
      });
    });

    it('responds with the rendered raw component', () => {
      delete fakeReq.body;
      fakeReq.raw = true;
      fakeRes.set.returns(fakeRes);
      fakeReq.url = chance.url();
      return subject.componentData(fakeReq, fakeRes, fakeNext).then(()=> {
        expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
        expect(fakeRes.send).to.have.been.calledWith(rawRenderResposne);
        expect(fakeRenderRawMarkup).to.have.been.calledWith({...fakeRenderOptions});
        expect(renderComponentStub).to.have.been.calledWith({ componentName, url: fakeReq.url, componentData:{ data: undefined } });
      });
    });

    it('calls next when a static asset', () => {
      delete fakeReq.props;
      fakeReq.preview = false;
      fakeReq.raw = false;
      const result = subject.componentData(fakeReq, fakeRes, fakeNext);
      return result.then(()=> {
        expect(fakeNext).to.have.been.calledOnce;
      });
    });
  });
});