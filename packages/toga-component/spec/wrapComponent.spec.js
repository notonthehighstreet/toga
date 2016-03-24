const { expect } = require('chai');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const chance = new require('chance')();
const subject = require('../src/wrapComponent');

describe('Wrap component', () => {
  let FakeComponent;
  let fakeComponentName;
  let fakeClassName;
  let fakeProps;
  let fakePropertyName;
  let renderedComponent;

  beforeEach(() => {
    fakePropertyName = chance.word();
    fakeProps = {
      [fakePropertyName]: chance.word()
    };
    fakeClassName = chance.word();
    fakeComponentName = chance.word();
    FakeComponent = React.createClass({
      render() {
        return (
          <div className={fakeClassName}>
            {this.props[fakePropertyName]}
          </div>
        );
      }
    });
    const WrappedComponent = subject(FakeComponent, fakeComponentName);

    renderedComponent = TestUtils.renderIntoDocument(<WrappedComponent {...fakeProps}/>);
  });
  it('returns a component with class name based on component name', () => {
    const expectedClassName = `toga-${fakeComponentName}`;
    const actualClassName = ReactDOM.findDOMNode(renderedComponent).className;

    expect(actualClassName).to.eq(expectedClassName);
  });
  it('wraps given component, passing down props', () => {
    const actualDOMNode = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, fakeClassName)[0];

    expect(actualDOMNode.innerHTML).to.eq(fakeProps[fakePropertyName]);
  });
});
