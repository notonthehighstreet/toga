import { expect } from 'chai';
import sinon from 'sinon';
import Chance  from 'chance';
import builder from './markup';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

const url = chance.url();
const mockRenderComponent = chance.url();

const mockStore = sandbox.stub();
const mockMakeRoutes = sandbox.stub();
const mockReact = { createElement: sandbox.stub().returns(mockRenderComponent) };
const mockRedux = { Provider: sandbox.stub() };
const mockStaticRouter = sandbox.stub();

// @TODO not the bests tests to make to a this component
describe('markup', function() {
  const deps = {
    'react' : mockReact,
    'react-redux': mockRedux,
    'react-router-dom/StaticRouter': mockStaticRouter,
  };

  let subject, result;
  beforeEach(function() {
    subject = builder(deps);
    result = subject({ url, store: mockStore, context: {}, makeRoutes: mockMakeRoutes });
  });

  afterEach(function() {
    sandbox.reset();
  });

  it('should render markup', function() {
    expect(result).to.eq(mockRenderComponent);
  });

  it('should have call to staticRouter', function() {
    expect(mockReact.createElement).to.have.been.calledTwice;
  });
});
