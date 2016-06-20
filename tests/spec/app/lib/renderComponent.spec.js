const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/renderComponent');
let actualSubjectReturnValue;
let expectedSubjectReturnValue = chance.word();
const fakeRenderedComponent = chance.word();
const sandbox = sinon.sandbox.create();
const renderReactStub = sandbox.stub().returns(fakeRenderedComponent);
const callbackStub = sandbox.stub().returns(expectedSubjectReturnValue);
let subject;
let fakeComponentName = chance.word();
let fakeComponentsContext = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};
const fakeRelativeComponentPath = `../../components/${fakeComponentName}`;
let callbackArguments;

describe('renderComponent', () => {
  before(() => {
    mockery.registerMock(`${fakeRelativeComponentPath}/`, () => {});
    mockery.enable();
  });
  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });
  beforeEach(() => {
    subject = builder({
      'toga-component': {
        renderReact: renderReactStub
      },
      '/lib/getAppConfig': sandbox.stub().returns({ componentsPath: chance.word() }),
      path: {
        join: sandbox.stub().returns(fakeRelativeComponentPath)
      }
    });
    actualSubjectReturnValue = subject({
      componentName: fakeComponentName,
      context: fakeComponentsContext
    }, callbackStub);
    callbackArguments = callbackStub.args[0][0];
  });
  afterEach(() => {
    sandbox.reset();
  });
  describe('calls the callback', () => {
    it('with the rendered component\'s DOM', () => {
      expect(callbackArguments.componentDOM).to.eq(fakeRenderedComponent);
    });
    it('with the component\'s name', () => {
      expect(callbackArguments.componentName).to.eq(fakeComponentName);
    });
    it('with the component\'s context', () => {
      expect(callbackArguments.context).to.deep.eq(fakeComponentsContext);
    });
    it('and returns its return value', () => {
      expect(actualSubjectReturnValue).to.eq(expectedSubjectReturnValue);
    });
  });
});
