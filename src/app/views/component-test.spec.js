const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./component-test');

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
let bundles;

describe('renderComponent', () => {

  beforeEach(() => {
    componentDOM = chance.word();
    componentName = chance.word();
    propKey = chance.word();
    propValue = chance.word();
    props = { [propKey] : propValue };
    bundles = {
      [componentName] : {
        js: chance.word(),
        css: chance.word(),
      }
    };
  });

  afterEach(() => {
    sandbox.reset();
  });

  it('renders a html page', () => {
    html = subject({componentDOM, componentName, props, bundles});
    expect(html.indexOf('<!DOCTYPE html>')).to.equal(0);
  });

  it('renders a stylesheet', () => {
    html = subject({componentDOM, componentName, props, bundles});
    expect(html).to.contain(`<link rel="stylesheet" type="text/css" href='${bundles[componentName].css}`);
  });

  it('renders scripts', () => {
    html = subject({componentDOM, componentName, props, bundles});
    expect(html).to.contain(`<script src='${bundles[componentName].js}`);
  });

  it('component encodes props', () => {
    fakeEntities.withArgs(JSON.stringify(props)).returns('encoded');
    html = subject({componentDOM, componentName, props, bundles});
    expect(fakeEntities).to.have.been.calledTwice;
    expect(html).to.contain('props=\'encoded\'');
  });

  it('component encodes componentName', () => {
    fakeEntities.withArgs(componentName).returns('encoded');
    html = subject({componentDOM, componentName, props, bundles});
    expect(fakeEntities).to.have.been.calledTwice;
    expect(html).to.contain('toga="encoded"');
  });
});
