const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./component-raw');

const sandbox = sinon.sandbox.create();
const fakeEntities = sandbox.stub();

const deps = {
  'entities': { encodeHTML : fakeEntities }
};
let subject = builder(deps);

let componentDOM;
let componentName;
let propKey;
let propValue;
let props;
let html;

describe('renderComponent', () => {

  beforeEach(() => {
    componentDOM = chance.word();
    componentName = chance.word();
    propKey = chance.word();
    propValue = chance.word();
    props = { [propKey] : propValue };
  });

  afterEach(() => {
    sandbox.reset();
  });

  it('renders a div', () => {
    html = subject({componentDOM, componentName, props});
    expect(html.indexOf('<div')).to.equal(0);
  });

  it('component encodes props', () => {
    fakeEntities.withArgs(JSON.stringify(props)).returns('encoded');
    html = subject({componentDOM, componentName, props});
    expect(fakeEntities).to.have.been.calledTwice;
    expect(html).to.contain('props=\'encoded\'');
  });

  it('component encodes componentName', () => {
    fakeEntities.withArgs(componentName).returns('encoded');
    html = subject({componentDOM, componentName, props});
    expect(fakeEntities).to.have.been.calledTwice;
    expect(html).to.contain('toga="encoded"');
  });
});
