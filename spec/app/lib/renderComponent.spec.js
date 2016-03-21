const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../app/lib/renderComponent');
let actualSubjectReturnValue;
let expectedSubjectReturnValue = chance.word();
const fakeRenderedComponent = chance.word();
const sandbox = sinon.sandbox.create();
const renderReactStub = sandbox.stub().returns(fakeRenderedComponent);
const callbackStub = sandbox.stub().returns(expectedSubjectReturnValue);
let subject;
let fakeLocale = chance.word();
let fakeComponentName = chance.word();
let fakeComponentsContext = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};
let callbackArguments;

mockery.registerMock(`../../components/${fakeComponentName}/`, () => {});
beforeEach(() => {
  mockery.enable();
  subject = builder({
    'toga-component': {
      renderReact: renderReactStub
    }
  });
  actualSubjectReturnValue = subject({
    locale: fakeLocale,
    componentName: fakeComponentName,
    componentsContext: fakeComponentsContext
  }, callbackStub);
  callbackArguments = callbackStub.args[0][0];
});
afterEach(() => {
  sandbox.reset();
  mockery.disable();
});
describe('renderComponent', () => {
  describe('calls the callback', () => {
    it('with the rendered component\'s DOM', () => {
      expect(callbackArguments.componentDOM).to.eq(fakeRenderedComponent);
    });
    it('with the component\'s name', () => {
      expect(callbackArguments.componentName).to.eq(fakeComponentName);
    });
    it('with the locale', () => {
      expect(callbackArguments.locale).to.eq(fakeLocale);
    });
    it('with the component\'s context', () => {
      expect(callbackArguments.context).to.deep.eq(fakeComponentsContext);
    });
    it('and returns its return value', () => {
      expect(actualSubjectReturnValue).to.eq(expectedSubjectReturnValue);
    });
  });
});
