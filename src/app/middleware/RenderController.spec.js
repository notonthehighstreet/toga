import bundles from '../../../dist/components/asset-bundles.json';

import { expect } from 'chai';
import sinon from 'sinon';
import builder from './RenderController';
import Chance from 'chance';
import { fakeResolve, fakeDebug } from '../../../tests/commonMocks';

const chance = new Chance();

describe('RenderController', function() {
  const sandbox = sinon.sandbox.create();

  const componentName = chance.word();
  const url = chance.url();
  const props = {[chance.word()]: chance.word()};

  const fakeReq = {
    componentName,
    url,
    props
  };

  const fakeRes = {
    set: sandbox.stub(),
    send: sandbox.stub()
  };

  const fakeNext = sandbox.stub();

  const fakeRequireReturn = { component: { default: sandbox.stub() } };
  const rawRenderResposne = chance.word();
  const testRenderResposne = chance.word();

  const mockRenderComponentStub = fakeResolve(fakeRequireReturn);
  const mockRenderRawMarkup = sandbox.stub().returns(rawRenderResposne);
  const mockRenderTestMarkup = sandbox.stub().returns(testRenderResposne);

  const mockComponent = sandbox.stub();

  const mockReactDOMServer = sandbox.stub();

  const RenderController = builder({
    'react-dom/server': { renderToString: mockReactDOMServer },
    '/views/component-raw': mockRenderRawMarkup,
    '/views/component-test': mockRenderTestMarkup,
    '/lib/component': mockComponent,
    '/lib/components/require': mockRenderComponentStub,
    debug: fakeDebug
  });

  let subject;

  beforeEach(function() {
    subject = new RenderController(fakeReq, fakeRes, fakeNext);
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('Constructor', function() {
    it('should build the class', function() {
      expect(subject.req).to.eq(fakeReq);
      expect(subject.res).to.eq(fakeRes);
      expect(subject.next).to.eq(fakeNext);

      expect(subject.renderer).to.eq(null);

      expect(mockRenderComponentStub).to.have.been.called;
    });
  });

  describe('render', function() {
    const mockRenderComponentData = { componentDOM: chance.word(), initialState: props };

    beforeEach(function() {
      sandbox.stub(subject, 'renderComponentData').returns(Promise.resolve(mockRenderComponentData));
    });

    context('with no data and no renderer', function() {
      it('should return a empty promise', function() {
        return subject.render().then(() => {
          expect(fakeNext).to.have.been.called;
          expect(mockComponent).not.to.have.been.called;
        });
      });
    });

    describe('with preview renderer', function() {
      before(function() {
        fakeReq.preview = true;
      });

      after(function() {
        delete fakeReq.preview;
      });

      it('should have a renderer for preview', ()=> {
        expect(subject.renderer).to.eq(mockRenderTestMarkup);
      });

      it('next shouldn\'t been called', function() {
        return subject.render().then(() => {
          expect(fakeNext).not.to.have.been.called;
        });
      });

      it('should have called render', ()=> {
        return subject.render().then(() => {
          expect(mockRenderTestMarkup).to.have.been.called;
          expect(mockRenderTestMarkup).to.have.been.calledWith({
            componentDOM: mockRenderComponentData.componentDOM,
            componentName,
            props,
            initialState: mockRenderComponentData.initialState,
            bundles
          });
        });
      });

      it('should have call set and send', ()=> {
        return subject.render().then(() => {
          expect(fakeRes.set).to.have.been.called;
          expect(fakeRes.send).to.have.been.called;
          expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
          expect(fakeRes.send).to.have.been.calledWith(testRenderResposne);
        });
      });

      it('should call renderComponentData', function() {
        subject.render().then(() => {
          expect(subject.renderComponentData).to.have.been.called;
          expect(subject.renderComponentData).to.have.been.calledWith({ url, props, websiteData: null });
        });
      });

      context('with data', function() {
        const websiteData = {[chance.word()]: chance.word()};
        it('should call renderComponentData', function() {
          subject.render(websiteData).then(() => {
            expect(subject.renderComponentData).to.have.been.called;
            expect(subject.renderComponentData).to.have.been.calledWith({ url, props, websiteData});
          });
        });
      });
    });

    describe('with raw renderer', function() {
      before(function() {
        fakeReq.raw = true;
      });

      after(function() {
        delete fakeReq.raw;
      });

      it('should have a renderer for raw', ()=> {
        expect(subject.renderer).to.eq(mockRenderRawMarkup);
      });

      it('next shouldn\'t been called', function() {
        return subject.render().then(() => {
          expect(fakeNext).not.to.have.been.called;
        });
      });

      it('should have call set and send', ()=> {
        return subject.render().then(() => {
          expect(fakeRes.set).to.have.been.called;
          expect(fakeRes.send).to.have.been.called;
          expect(fakeRes.set).to.have.been.calledWith('Content-Type', 'text/html');
          expect(fakeRes.send).to.have.been.calledWith(rawRenderResposne);
        });
      });

      it('should have called render', ()=> {
        return subject.render().then(() => {
          expect(mockRenderRawMarkup).to.have.been.called;
          expect(mockRenderRawMarkup).to.have.been.calledWith({
            componentDOM: mockRenderComponentData.componentDOM,
            componentName,
            props,
            initialState: mockRenderComponentData.initialState,
            bundles
          });
        });
      });

      it('should call renderComponentData', function() {
        subject.render().then(() => {
          expect(subject.renderComponentData).to.have.been.called;
          expect(subject.renderComponentData).to.have.been.calledWith({ url, props, websiteData: null });
        });
      });

      context('with data', function() {
        const websiteData = {[chance.word()]: chance.word()};
        it('should call renderComponentData', function() {
          subject.render(websiteData).then(() => {
            expect(subject.renderComponentData).to.have.been.called;
            expect(subject.renderComponentData).to.have.been.calledWith({ url, props, websiteData});
          });
        });
      });
    });
  });

  describe('renderComponentData', function() {
    const mockDOM = chance.word();

    const fakeCreateComponentReturn = { component:  sandbox.stub(), initialState: props };
    const mockCreateComponent = sandbox.stub().returns(fakeCreateComponentReturn);

    before(function() {
      mockComponent.returns({ create: mockCreateComponent });
      mockReactDOMServer.returns(mockDOM);
    });

    [null, chance.word()].forEach(function(websiteData) {
      it('should create a new Component with '+ websiteData +' data', function() {
        return subject.renderComponentData({url, props, websiteData}).then(() => {
          expect(mockComponent).to.have.been.called;
          expect(mockCreateComponent).to.have.been.called;
          expect(mockComponent).to.have.been.calledWith({
            url,
            props,
            component: fakeRequireReturn.component.default,
          });
          expect(mockCreateComponent).to.have.been.calledWith(websiteData);
        });
      });
    });

    it('should render a server', function() {
      return subject.renderComponentData({url, props, websiteData: null}).then(() => {
        expect(mockReactDOMServer).to.have.been.called;
        expect(mockReactDOMServer).to.have.been.calledWith(fakeCreateComponentReturn.component);
      });
    });

    it('should return componentDOM and initialState', function() {
      return subject.renderComponentData({url, props, websiteData: null}).then(({componentDOM, initialState}) => {
        expect(componentDOM).to.eq(mockDOM);
        expect(initialState).to.eq(fakeCreateComponentReturn.initialState);
      });
    });
  });
});
