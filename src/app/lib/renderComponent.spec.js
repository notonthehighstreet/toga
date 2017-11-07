const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./renderComponent');

const sandbox = sinon.sandbox.create();

describe('renderComponent', function() {
  let subject;
  let subjectReturnValue;

  const mockUrl = chance.url();
  const mockDOM = chance.word();

  const mockComponent = {
    name: chance.word(),
    path: chance.word(),
    props: { test: chance.word() },
    mock: sinon.stub()
  };

  const mockRequireComponent = sandbox.stub();
  const mockGetComponentData = sandbox.stub();

  const deps = {
    'react-dom/server': { renderToString: sandbox.stub().returns(mockDOM) },
    '/lib/getComponentData': mockGetComponentData,
    '/lib/components/require': mockRequireComponent
  };

  afterEach(function() {
    sandbox.reset();
  });

  beforeEach(function() {
    mockRequireComponent.returns(Promise.resolve({ component: mockComponent.mock, path: mockComponent.path}));
    mockGetComponentData.returns({ Component: {}, initialState: {}});
  });

  describe('returns', function() {
    beforeEach(function() {
      subject = builder(deps);
      subjectReturnValue = subject({
        url: mockUrl,
        componentName: mockComponent.name,
        props: mockComponent.props
      });
    });

    it('renderReactStub is called with the correct args', function() {
      return subjectReturnValue.then(function() {
        expect(mockGetComponentData).to.be.called;
        expect(mockGetComponentData).to.be.calledWith({
          url: mockUrl,
          Component: mockComponent.mock,
          componentPath: mockComponent.path,
          props: mockComponent.props
        });
      });
    });

    it('the rendered component\'s DOM', function() {
      return subjectReturnValue.then((callbackArguments) => {
        expect(callbackArguments.componentDOM).to.eq(mockDOM);
      });
    });

    it('the component\'s name', function() {
      return subjectReturnValue.then((callbackArguments) => {
        expect(callbackArguments.componentName).to.eq(mockComponent.name);
      });
    });

    it('the component\'s props', function() {
      return subjectReturnValue.then((callbackArguments) => {
        expect(callbackArguments.props).to.deep.eq(mockComponent.props);
      });
    });
  });
});
