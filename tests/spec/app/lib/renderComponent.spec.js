const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/renderComponent');
import { fakeResolve, fakeDebug } from '../../commonMocks';

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
const fakeNotFoundError = sandbox.stub().throws();
const fakeInternalServerError = sandbox.stub().throws();
const fakeModulePaths = [chance.file()];
const fakeMapPath = chance.word();
const deps = {
  'react': {
    createElement: reactStub
  },
  'react-dom/server': {
    renderToString: renderReactStub
  },
  '/config/index': sandbox.stub().returns({ componentsPath: chance.word() }),
  '/lib/utils/pathsExist': fakeResolve(true),
  '/lib/utils/errors': {
    NotFoundError: fakeNotFoundError,
    InternalServerError: fakeInternalServerError
  },
  '/lib/utils/componentHelper': {
    path: sandbox.stub().returns(fakeModulePaths),
    bundleId: sandbox.stub().returns(fakeMapPath)
  },
  path: {
    join: sandbox.stub().returns(fakeRelativeComponentPath)
  },
  debug: fakeDebug
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

  afterEach(() => {
    sandbox.reset();
  });

  describe('returns', () => {

    beforeEach(() => {
      subject = builder(deps);
      actualSubjectReturnValue = subject({
        componentName: fakeComponentName,
        context: fakeComponentContext
      });
    });

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

  context('when the path does not exist', () => {
    beforeEach(()=>{
      deps['/lib/utils/pathsExist'] = fakeResolve(false);
      subject = builder(deps);
      actualSubjectReturnValue = subject({
        componentName: fakeComponentName,
        context: fakeComponentContext
      });
    });

    it('throws an error', () => {
      return actualSubjectReturnValue.catch((error) => {
        expect(fakeNotFoundError).to.have.been.called;
        expect(error).to.be.an.instanceOf(Error);
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
    deps['/lib/utils/pathsExist'] = fakeResolve(true);
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
