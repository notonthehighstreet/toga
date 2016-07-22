const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/renderComponent');
let actualSubjectReturnValue;
let expectedSubjectReturnValue = chance.word();
const fakeRenderedComponent = chance.word();
const fakeReact = chance.word();
const sandbox = sinon.sandbox.create();
const reactStub = sandbox.stub().returns(fakeReact);
const renderReactStub = sandbox.stub().returns(fakeRenderedComponent);
const callbackStub = sandbox.stub().returns(expectedSubjectReturnValue);
let subject;
let fakeComponentName = chance.word();
let fakeComponentContext = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};
const fakeRelativeComponentPath = `../../components/${fakeComponentName}`;
let callbackArguments;

describe('renderComponent', () => {
  const MockComponent = () => {};

  before(() => {
    mockery.registerMock(`${fakeRelativeComponentPath}/`, MockComponent);
    mockery.enable();
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  beforeEach(() => {
    subject = builder({
      'react': {
        createElement: reactStub
      },
      'react-dom/server': {
        renderToString: renderReactStub
      },
      '/lib/getAppConfig': sandbox.stub().returns({ componentsPath: chance.word() }),
      path: {
        join: sandbox.stub().returns(fakeRelativeComponentPath)
      }
    });
    actualSubjectReturnValue = subject({
      componentName: fakeComponentName,
      context: fakeComponentContext
    }, callbackStub);
    callbackArguments = callbackStub.args[0][0];
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('calls the callback', () => {
    context('when the component uses module.exports', ()=>{
      it('renderReactStub is called with the correct args', () => {
        expect(reactStub).to.be.calledWith(MockComponent, fakeComponentContext);
      });
    });
    it('with the rendered component\'s DOM', () => {
      expect(callbackArguments.componentDOM).to.eq(fakeRenderedComponent);
    });
    it('with the component\'s name', () => {
      expect(callbackArguments.componentName).to.eq(fakeComponentName);
    });
    it('with the component\'s context', () => {
      expect(callbackArguments.context).to.deep.eq(fakeComponentContext);
    });
    it('and returns its return value', () => {
      expect(actualSubjectReturnValue).to.eq(expectedSubjectReturnValue);
    });
  });
});

describe('when the component uses export default', () => {
  const MockComponent = { default: () => {} };

  before(() => {
    mockery.registerMock(`${fakeRelativeComponentPath}/`, MockComponent);
    mockery.enable();
  });
  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });
  beforeEach(() => {
    subject = builder({
      'react': {
        createElement: reactStub
      },
      'react-dom/server': {
        renderToString: renderReactStub
      },
      '/lib/getAppConfig': sandbox.stub().returns({ componentsPath: chance.word() }),
      path: {
        join: sandbox.stub().returns(fakeRelativeComponentPath)
      }
    });
    actualSubjectReturnValue = subject({
      componentName: fakeComponentName,
      context: fakeComponentContext
    }, callbackStub);
    callbackArguments = callbackStub.args[0][0];
  });
  afterEach(() => {
    sandbox.reset();
  });
  it('renderReactStub is called with the correct args', () => {
    expect(reactStub).to.be.calledWith(MockComponent.default, fakeComponentContext);
  });
});
