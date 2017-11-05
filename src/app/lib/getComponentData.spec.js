import { expect } from 'chai';
import sinon from 'sinon';
import Chance  from 'chance';
import builder from './getComponentData';

const chance = new Chance();

let sandbox = sinon.sandbox.create();

const fakeReact = chance.word();
const reactStub = sandbox.stub();

const fakeMatchPath = { default: sandbox.stub().returns(true) };
const fakeProvider = 'asfasdfsa';
const fakeStaticRouter = sandbox.stub();

const deps = {
  'react': { createElement: reactStub },
  'react-redux': ( ) => ({ Provider: fakeProvider}),
  'react-router-dom/matchPath': fakeMatchPath,
  'react-router-dom/StaticRouter': fakeStaticRouter
};

let fakeComponentProps = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};

const fakeComponentStore = {
  dispatch: sandbox.stub(),
  getState: sandbox.stub().returns(fakeComponentProps)
};

const fakeComponentRoute ={
  Component:{
    needs: [],
    data: []
  }
};

const fakeComponentRoutes = {
  getRoutesConfig: sandbox.stub().returns([fakeComponentRoute]),
  makeRoutes: sandbox.stub()
};

const subect = builder(deps);

const url = chance.url();

describe('getComponentData', () => {
  beforeEach(()=>{
    reactStub.returns(fakeReact);
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('renderComponentWithProps', () => {
    const MockComponent = () => {};

    it('react component render', () => {
      const returnedValue = subect({ 
        url, 
        Component: MockComponent,
        componentData: { props: fakeComponentProps }
      });

      return returnedValue.then((callbackArguments)=>{
        expect(callbackArguments.Component).to.eq(fakeReact);
        expect(reactStub).to.have.been.calledWith(MockComponent, fakeComponentProps);
      });
    });
  });

  describe('renderComponentWithData', () => {
    let returnedValue;
    const mockComponent = {
      store: fakeComponentStore,
      routes: fakeComponentRoutes
    };

    describe('with data (getRouteData)', () =>  {
      beforeEach(() => {
        returnedValue = subect({
          url,
          Component: mockComponent,
          componentData: { props: fakeComponentProps }
        });
      });

      it('with empty routes', () => {
        return returnedValue.then((callbackArguments)=>{
          expect(callbackArguments.Component).to.eq(fakeReact);
          expect(callbackArguments.initialState).to.eq(fakeComponentProps);

          expect(fakeComponentStore.getState).to.have.been.calledOnce;
          expect(fakeComponentRoutes.getRoutesConfig).to.have.been.calledOnce;
          expect(fakeComponentRoutes.makeRoutes).to.have.been.calledOnce;

          expect(fakeMatchPath.default).to.have.been.calledWith(url, { path: undefined, exact: undefined, strict: false });
          expect(reactStub).to.have.been.calledTwice;
        });
      });

      describe('with a props action', () => {
        let needAction;
        let needActionResult;

        before(() => {
          needActionResult = chance.word();
          needAction = sandbox.stub().returns(needActionResult);

          fakeComponentRoute.Component.needs = [needAction];
        });

        it('should be called setRouteData actionsDispatcher', () => {
          return returnedValue.then(()=>{
            expect(needAction).to.have.been.calledOnce;
            expect(needAction).to.have.been.calledWithExactly(fakeComponentProps);

            expect(fakeComponentStore.dispatch).to.have.been.calledOnce;
            expect(fakeComponentStore.dispatch).to.have.been.calledWithExactly(needActionResult);
          });
        });
      });
    });

    describe('with props (setRouteData)', () =>  {
      beforeEach(() => {
        returnedValue = subect({
          url,
          Component: mockComponent,
          componentData: { data: fakeComponentProps }
        });
      });

      it('with empty routes', () => {
        return returnedValue.then((callbackArguments)=>{
          expect(callbackArguments.Component).to.eq(fakeReact);
          expect(callbackArguments.initialState).to.eq(fakeComponentProps);
          
          expect(fakeComponentStore.getState).to.have.been.calledOnce;
          expect(fakeComponentRoutes.getRoutesConfig).to.have.been.calledOnce;
          expect(fakeComponentRoutes.makeRoutes).to.have.been.calledOnce;
  
          expect(fakeMatchPath.default).to.have.been.calledWith(url, { path: undefined, exact: undefined, strict: false });
          expect(reactStub).to.have.been.calledTwice;
        });
      });

      describe('with a data action', () => {
        let dataAction;
        let dataActionResult;

        before(() => {
          dataActionResult = chance.word();
          dataAction = sandbox.stub().returns(dataActionResult);

          fakeComponentRoute.Component.data = [dataAction];
        });

        it('should be called setRouteData actionsDispatcher', () => {
          return returnedValue.then(()=>{
            expect(dataAction).to.have.been.calledOnce;
            expect(dataAction).to.have.been.calledWithExactly(fakeComponentProps);

            expect(fakeComponentStore.dispatch).to.have.been.calledOnce;
            expect(fakeComponentStore.dispatch).to.have.been.calledWithExactly(dataActionResult);
          });
        });
      });
    });
  });
});
