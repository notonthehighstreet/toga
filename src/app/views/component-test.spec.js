const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./component-test');

const sandbox = sinon.sandbox.create();
const fakeApiVersion = chance.word();
const fakeVendorName = chance.word();
const fakeConfig = () => ({ apiVersion: fakeApiVersion, vendor: { componentName : fakeVendorName } });
const fakeEntities = sandbox.stub();

const bundleFilenameStub = sandbox.stub();
const bundleFileName = chance.word();
bundleFilenameStub.returns(bundleFileName);

const deps = {
  '/lib/bundler/bundleFilename': bundleFilenameStub,
  '/config/index': fakeConfig,
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

  it('renders a html page', () => {
    html = subject({componentDOM, componentName, props});
    expect(html.indexOf('<!DOCTYPE html>')).to.equal(0);
  });

  it('renders a stylesheet', () => {
    html = subject({componentDOM, componentName, props});
    expect(html).to.contain(`<link rel="stylesheet" type="text/css" href='/v${fakeApiVersion}/${componentName}/${bundleFileName}.css`);
  });

  it('renders scripts', () => {
    html = subject({componentDOM, componentName, props});
    expect(html).to.contain(`<script src='/v${fakeApiVersion}/${fakeVendorName}/${bundleFileName}.js`);
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
