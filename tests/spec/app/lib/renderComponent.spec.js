const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/renderComponent');
import { fakePromise } from '../../commonMocks';

let actualSubjectReturnValue;
const fakeRenderedComponent = chance.word();
const fakeReact = chance.word();
const sandbox = sinon.sandbox.create();
const reactStub = sandbox.stub().returns(fakeReact);
const renderReactStub = sandbox.stub().returns(fakeRenderedComponent);
let subject;
let fakeComponentName = chance.word();
let fakeComponentContext = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};
const fakeRelativeComponentPath = `../../components/${fakeComponentName}`;

const deps = {
  'react': {
    createElement: reactStub
  },
  'react-dom/server': {
    renderToString: renderReactStub
  },
  '/lib/getAppConfig': sandbox.stub().returns({ componentsPath: chance.word() }),
  '/lib/utils/pathsExist': fakePromise,
  '/lib/utils/createModulePaths': sandbox.stub().returns(chance.word()),
  path: {
    join: sandbox.stub().returns(fakeRelativeComponentPath)
  }
};

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
    subject = builder(deps);
    actualSubjectReturnValue = subject({
      componentName: fakeComponentName,
      context: fakeComponentContext
    });
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('returns', () => {
    context('when the component uses module.exports', ()=>{
      it('renderReactStub is called with the correct args', () => {
        expect(reactStub).to.be.calledWith(MockComponent, fakeComponentContext);
      });
    });
    it('the rendered component\'s DOM', () => {
      return actualSubjectReturnValue.then((callbackArguments) => {
        expect(callbackArguments.componentDOM).to.eq(fakeRenderedComponent);
      });
    });
    it('the component\'s name', () => {
      return actualSubjectReturnValue.then((callbackArguments) => {
        expect(callbackArguments.componentName).to.eq(fakeComponentName);
      });
    });
    it('the component\'s context', () => {
      return actualSubjectReturnValue.then((callbackArguments) => {
        expect(callbackArguments.context).to.deep.eq(fakeComponentContext);
      });
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
    subject = builder(deps);
    actualSubjectReturnValue = subject({
      componentName: fakeComponentName,
      context: fakeComponentContext
    });
  });
  afterEach(() => {
    sandbox.reset();
  });
  it('renderReactStub is called with the correct args', () => {
    return actualSubjectReturnValue.then(()=> {
      expect(reactStub).to.be.calledWith(MockComponent.default, fakeComponentContext);
    });
  });
});
