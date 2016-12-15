const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./renderComponent');
import { fakeDebug } from '../../../tests/commonMocks';

const sandbox = sinon.sandbox.create();

let actualSubjectReturnValue;
const fakeRenderedComponent = chance.word();

const fakeModulePaths = [chance.file()];
let fakeComponentName = chance.word();
const fakeRelativeComponentPath = `../../components/${fakeComponentName}`;
const fakeComponentInfo = [{ requirePath : fakeRelativeComponentPath, path : chance.word(),  file: fakeModulePaths[0],  name: chance.word() }];
const fakeGetComponentInfo = sandbox.stub().returns(fakeComponentInfo);

const fakeReact = chance.word();
const reactStub = sandbox.stub().returns(fakeReact);
const renderReactStub = sandbox.stub().returns(fakeRenderedComponent);
let subject;
let fakeComponentProps = {
  [chance.word()]: chance.word(),
  [chance.word()]: chance.word()
};
const fakeNotFoundError = sandbox.stub().throws();
const fakeInternalServerError = sandbox.stub().throws();
const deps = {
  'react': {
    createElement: reactStub
  },
  'react-dom/server': {
    renderToString: renderReactStub
  },
  '/lib/utils/errors': {
    NotFoundError: fakeNotFoundError,
    InternalServerError: fakeInternalServerError
  },
  '/lib/getComponentInfo': fakeGetComponentInfo,
  debug: fakeDebug
};

describe('renderComponent', () => {
  const MockComponent = () => {};

  before(() => {
    mockery.registerMock(fakeRelativeComponentPath, MockComponent);
    mockery.enable();
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('returns', () => {

    beforeEach(() => {
      subject = builder(deps);
      actualSubjectReturnValue = subject({
        componentName: fakeComponentName,
        props: fakeComponentProps
      });
    });

    context('when the component uses module.exports', ()=>{
      it('renderReactStub is called with the correct args', () => {
        expect(reactStub).to.be.calledWith(MockComponent, fakeComponentProps);
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

    it('the component\'s props', () => {
      return actualSubjectReturnValue.then((callbackArguments) => {
        expect(callbackArguments.props).to.deep.eq(fakeComponentProps);
      });
    });
  });
});

describe('when the component uses export default', () => {
  const MockComponent = { default: () => {} };

  before(() => {
    mockery.registerMock(fakeRelativeComponentPath, MockComponent);
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
      props: fakeComponentProps
    });
  });
  afterEach(() => {
    sandbox.reset();
  });
  it('renderReactStub is called with the correct args', () => {
    return actualSubjectReturnValue.then(()=> {
      expect(reactStub).to.be.calledWith(MockComponent.default, fakeComponentProps);
    });
  });
});
