import { expect } from 'chai';
import sinon from 'sinon';
import Chance  from 'chance';
import builder from './getComponentData';

const chance = new Chance();

let sandbox = sinon.sandbox.create();

const url = chance.url();
const mockReact = chance.word();
const mockMarkup = sandbox.stub();
const mockReactStub = sandbox.stub();

const mockRouteOperations ={
  getData: sandbox.stub().returns(Promise.resolve())
};

const mockComponentProps = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};

const mockStore = {
  dispatch: sandbox.stub(),
  getState: sandbox.stub().returns(mockComponentProps)
};

const mockComponentRoute = { Component:{ needs: [], data: [] } };
const mockRoutes = {
  getRoutesConfig: sandbox.stub().returns([mockComponentRoute]),
  makeRoutes: sandbox.stub()
};

describe('getComponentData', function()  {
  let subect;
  let returnedValue;

  const deps = {
    'react': { createElement: mockReactStub },
    '/lib/components/markup': mockMarkup,
    '/lib/components/route': mockRouteOperations
  };

  beforeEach(function() {
    mockReactStub.returns(mockReact);
    subect = builder(deps);
  });

  afterEach(function() {
    sandbox.reset();
  });

  describe('renderComponentWithProps', function() {
    const MockComponent = () => {};

    beforeEach(function() {
      returnedValue = subect({
        url,
        Component: MockComponent,
        props: mockComponentProps
      });
    });

    it('react component render', function() {
      return returnedValue.then((callbackArguments)=>{
        expect(callbackArguments.Component).to.eq(mockReact);
        expect(mockReactStub).to.have.been.calledWith(MockComponent, mockComponentProps);
      });
    });
  });

  describe('renderComponentWithData', function() {
    const mockComponent = {
      store: mockStore,
      routes: mockRoutes
    };

    beforeEach(function() {
      mockMarkup.returns(mockComponent);
      returnedValue = subect({
        url,
        Component: mockComponent,
        props: mockComponentProps
      });
    });

    it('should have called getState', function() {
      return returnedValue.then(()=>{
        expect(mockStore.getState).to.have.been.calledOnce;
      });
    });

    it('should call upon RouteOperations.getData', function() {
      return returnedValue.then(function() {
        expect(mockRouteOperations.getData).to.have.been.calledOnce;
        expect(mockRouteOperations.getData).to.have.been.calledWith(
          [mockComponentRoute],
          url,
          mockComponent.store.dispatch,
          mockComponentProps
        );
      });
    });

    it('should call upon route.component.getRoutesConfig', function() {
      return returnedValue.then(function() {
        expect(mockRoutes.getRoutesConfig).to.have.been.calledOnce;
      });
    });

    it('should call upon Markup', function() {
      return returnedValue.then(function() {
        expect(mockMarkup).to.have.been.calledOnce;
        expect(mockMarkup).to.have.been.calledWith({url, store: mockStore, context:{}, makeRoutes: mockRoutes.makeRoutes});
      });
    });

    it('should return Component', function() {
      return returnedValue.then((callbackArguments)=>{
        expect(callbackArguments.Component).to.eq(mockComponent);
      });
    });

    it('should return initialState', function() {
      return returnedValue.then((callbackArguments)=>{
        expect(callbackArguments.initialState).to.eq(mockComponentProps);
      });
    });
  });
});
