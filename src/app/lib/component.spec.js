import { expect } from 'chai';
import sinon from 'sinon';
import builder from './component';
import Chance from 'chance';
import { fakeDebug } from '../../../tests/commonMocks';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

const url = chance.url();
const mockReact = chance.word();
const mockMarkup = sandbox.stub();
const mockReactStub = sandbox.stub();

const mockRouteOperations ={
  getData: sandbox.stub().returns(Promise.resolve()),
  setData: sandbox.stub().returns(Promise.resolve())
};

const props = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};

const mockStore = {
  dispatch: sandbox.stub(),
  getState: sandbox.stub().returns(props)
};

const mockComponentRoute = { Component:{ needs: [], data: [] } };
const mockRoutes = {
  getRoutesConfig: sandbox.stub().returns([mockComponentRoute]),
  makeRoutes: sandbox.stub()
};

const mockComponent = {
  routes: mockRoutes
};

describe('Component', function() {
  const deps = {
    'react': { createElement: mockReactStub },
    '/lib/components/markup': mockMarkup,
    '/lib/components/route': mockRouteOperations,
    debug: fakeDebug
  };
  const Component = builder(deps);
  
  let subject;

  beforeEach(function() {
    mockReactStub.returns(mockReact);
    subject = new Component({component: mockComponent, props, url});
  });

  afterEach(function() {
    sandbox.reset();
  });

  it('Constructor', function() {
    expect(subject.props).to.eq(props);
    expect(subject.url).to.eq(url);
    expect(subject.component).to.eq(mockComponent);

    expect(subject.store).to.be.undefined;
    expect(subject.routes).to.eq(mockRoutes);
  });

  describe('createWithoutStore', function() {
    it('react component render', function() {
      return subject.create().then((callbackArguments)=>{
        expect(callbackArguments.component).to.eq(mockReact);
        expect(mockReactStub).to.have.been.calledWith(mockComponent, props);
      });
    });
  });

  describe('renderComponentWithData', function() {
    const mockMarkupReturn = chance.word();
    before(function() {
      mockComponent.store = mockStore;
      mockMarkup.returns(mockMarkupReturn);
    });

    after(function() {
      delete mockComponent.store;
    });

    it('Component store with value', function() {
      expect(subject.store).to.eq(mockStore);
    }); 

    it('should have called getState', function() {
      return subject.create().then(()=>{
        expect(mockStore.getState).to.have.been.calledOnce;
      });
    });

    it('should call upon RouteOperations.getData', function() {
      return subject.create().then(function() {
        expect(mockRouteOperations.getData).to.have.been.calledOnce;
        expect(mockRouteOperations.getData).to.have.been.calledWith(
          [mockComponentRoute],
          url,
          mockComponent.store.dispatch,
          props
        );
      });
    });

    it('should call upon RouteOperations.setData', function() {
      const website = { [chance.word()]: chance.word() };
      return subject.create(website).then(function() {
        expect(mockRouteOperations.setData).to.have.been.calledOnce;
        expect(mockRouteOperations.setData).to.have.been.calledWith(
          [mockComponentRoute],
          mockComponent.store.dispatch,
          website
        );
      });
    });

    it('should call upon route.component.getRoutesConfig', function() {
      return subject.create().then(function() {
        expect(mockRoutes.getRoutesConfig).to.have.been.calledOnce;
      });
    });

    it('should call upon Markup', function() {
      return subject.create().then(function() {
        expect(mockMarkup).to.have.been.calledOnce;
        expect(mockMarkup).to.have.been.calledWith({url, store: mockStore, context:{}, makeRoutes: mockRoutes.makeRoutes});
      });
    });

    it('should return Component', function() {
      return subject.create().then((callbackArguments)=>{
        expect(callbackArguments.component).to.eq(mockMarkupReturn);
      });
    });

    it('should return initialState', function() {
      return subject.create().then((callbackArguments)=>{
        expect(callbackArguments.initialState).to.eq(props);
      });
    });
  });
});
