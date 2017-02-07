const { expect, assert } = require('chai');
const path = require('path');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const Chance = require('chance');
const chance = new Chance();
const proxyquire = require('proxyquire');

proxyquire.noPreserveCache();

let generator;

describe('generateBundle', () => {
  context('helpers ', () => {
    const fakeVendorName = chance.word();
    const fakeStaticComponents = [];
    const fakeComponent = { file: chance.word(), name: chance.word() };
    const fakeComponent2 = { file: chance.word(), name: chance.word() };
    const fakeConfig = {
      components: {
        'path': './components',
        bundles: [{
          'name': chance.word(),
          'components': [fakeComponent.name],
        }]
      },
      staticComponents: fakeStaticComponents,
      vendor: { componentName: fakeVendorName },
      dev: true
    };
    const fakeGetConfig = sandbox.stub().returns(()=>(fakeConfig));
    const fakeGetComponentInfo = sandbox.stub().returns(() => [ fakeComponent ]);
    const fakeWebpack = sandbox.stub();
    const fakeSsrHelper = sandbox.stub();
    const fakeFs = { write: sandbox.stub() };

    beforeEach(() => {
      generator = proxyquire('./generateBundles',  {
        '../app/lib/getComponentInfo': fakeGetComponentInfo,
        '../app/config': fakeGetConfig,
        './webpack': fakeWebpack,
        './ssr-helper': fakeSsrHelper,
        'fs': fakeFs,
      });
    });

    afterEach(() => {
      sandbox.reset();
    });

    after(() => {
      sandbox.restore();
    });

    it('creates entry points for webpack', () => {
      const entry = generator.createEntryPoints([fakeComponent]);
      expect(Object.keys(entry).length).to.deep.equal(1);
      expect(entry[fakeComponent.name]).to.deep.equal(fakeComponent.file);
    });

    it('creates entry points for webpack with multiple components', () => {
      const entry = generator.createEntryPoints([fakeComponent, fakeComponent2]);
      expect(Object.keys(entry).length).to.deep.equal(2);
      expect(entry[fakeComponent.name]).to.deep.equal(fakeComponent.file);
      expect(entry[fakeComponent2.name]).to.deep.equal(fakeComponent2.file);
    });

    it('creates entry points with bundles for webpack', () => {
      const entry = generator.createEntryPoints([fakeComponent], fakeConfig.components.bundles);
      expect(Object.keys(entry).length).to.deep.equal(2);
      expect(entry[fakeComponent.name]).to.deep.equal(fakeComponent.file);
      expect(entry[fakeConfig.components.bundles[0].name]).to.deep.equal([fakeComponent.file]);
    });

    it('creates entry points with bundles for webpack with multiple components', () => {
      const entry = generator.createEntryPoints([fakeComponent, fakeComponent2], fakeConfig.components.bundles);
      expect(Object.keys(entry).length).to.deep.equal(3);
      expect(entry[fakeComponent.name]).to.deep.equal(fakeComponent.file);
      expect(entry[fakeComponent2.name]).to.deep.equal(fakeComponent2.file);
      expect(entry[fakeConfig.components.bundles[0].name]).to.deep.equal([fakeComponent.file]);
    });

    it('creates Toga Loader Rules', () => {
      const rules = generator.createTogaLoaderRules([fakeComponent]);
      expect(rules.length).to.equal(1);
      expect(rules[0].loaders).to.deep.equal(['toga-loader']);
      expect(rules[0].test).to.deep.equal([new RegExp(`.*${fakeComponent.file}$`)]);
    });

    it('creates Toga Loader Rules with multiple components', () => {
      const rules = generator.createTogaLoaderRules([fakeComponent, fakeComponent2]);
      expect(rules.length).to.equal(1);
      expect(rules[0].loaders).to.deep.equal(['toga-loader']);
      expect(rules[0].test).to.deep.equal([new RegExp(`.*${fakeComponent.file}$`), new RegExp(`.*${fakeComponent2.file}$`)]);
    });
  });

  context('with basic config (no components and no bundles and no static bundles)',  ()=> {

    const fakeVendorName = chance.word();
    const fakeStaticComponents = [];
    const fakeGetConfig = sandbox.stub().returns(()=>(
      { components: { },
        staticComponents: fakeStaticComponents,
        vendor: { componentName: fakeVendorName },
        dev: true
      }
    ));
    const fakeGetComponentInfo = sandbox.stub().returns(()=>([]));
    const fakeWebpack = sandbox.stub();
    const fakeSsrHelper = sandbox.stub();
    const fakeFs = { write: sandbox.stub() };

    beforeEach(() => {
      generator = proxyquire('./generateBundles',  {
        '../app/lib/getComponentInfo': fakeGetComponentInfo,
        '../app/config': fakeGetConfig,
        './webpack': fakeWebpack,
        './ssr-helper': fakeSsrHelper,
        'fs': fakeFs,
      });
    });

    afterEach(() => {
      sandbox.reset();
    });

    after(() => {
      sandbox.restore();
    });

    it('is a promise', () => {
      return generator.then(() => {
        assert(true, 'Generate bundles should return a promise');
      }).catch(e => {
        assert(false, 'Generate bundles should return a promise');
        throw Error(e);
      });
    });

    it('uses the ssr helper to prep for server-side requireing of image files', () => {
      return generator.then(() => {
        expect(fakeSsrHelper).to.have.been.called;
        expect(fakeSsrHelper).to.have.been.calledWith();
      });
    });

    it('runs webpack to generate static bundles',  ()=>{
      return generator.then(() => {
        expect(fakeWebpack).to.have.been.called;
        const togaSrcRender = path.join(__dirname, '..', 'script', 'webpack', 'staticRender.js');
        expect(fakeWebpack).to.have.been.calledWith({ entry:  { static: togaSrcRender }, staticComponents:fakeStaticComponents, staticLocals: generator.requireComponents()});
      });
    });

    it('runs webpack to bundle components', () => {
      return generator.then(() => {
        expect(fakeWebpack).to.have.been.called;
        expect(fakeWebpack).to.have.been.calledWith({ minify: false, entry: generator.createEntryPoints(), rules: generator.createTogaLoaderRules(), staticComponents:fakeStaticComponents, commonsChunkName: fakeVendorName});
      });
    });
  });

  context('with a component',  ()=> {
    const fakeVendorName = chance.word();
    const fakeStaticComponents = [];
    const fakeGetConfig = sandbox.stub().returns(()=>(fakeConfig));
    const fakeConfig = {
      components: {
        'path': './components',
      },
      staticComponents: fakeStaticComponents,
      vendor: { componentName: fakeVendorName },
      dev: true
    };
    const fakeComponent = { file: chance.word(), name: chance.word() };
    const fakeGetComponentInfo = sandbox.stub().returns(() => [ fakeComponent ]);
    const fakeWebpack = sandbox.stub();
    const fakeSsrHelper = sandbox.stub();
    const fakeFs = { write: sandbox.stub() };

    beforeEach(() => {
      generator = proxyquire('./generateBundles',  {
        '../app/lib/getComponentInfo': fakeGetComponentInfo,
        '../app/config': fakeGetConfig,
        './webpack': fakeWebpack,
        './ssr-helper': fakeSsrHelper,
        'fs': fakeFs,
      });
    });

    afterEach(() => {
      sandbox.reset();
    });

    after(() => {
      sandbox.restore();
    });

    it('runs webpack to bundle components', () => {
      return generator.then(() => {
        const entry = generator.createEntryPoints([fakeComponent]);
        const rules = generator.createTogaLoaderRules([fakeComponent]);
        expect(fakeWebpack).to.have.been.called;
        expect(fakeWebpack).to.have.been.calledWith({ minify: !fakeConfig.dev, entry, rules, staticComponents:fakeStaticComponents, commonsChunkName: fakeVendorName});
      });
    });
  });

  context('with a bundle',  ()=> {
    const fakeVendorName = chance.word();
    const fakeStaticComponents = [];
    const fakeComponent = { file: chance.word(), name: chance.word() };
    const fakeConfig = {
      components: {
        'path': './components',
        bundles: [{
          'name': chance.word(),
          'components': [fakeComponent.name],
          file: chance.word(),
        }]
      },
      staticComponents: fakeStaticComponents,
      vendor: { componentName: fakeVendorName },
      dev: true
    };
    const fakeGetConfig = sandbox.stub().returns(()=>(fakeConfig));
    const fakeGetComponentInfo = sandbox.stub().returns(() => fakeConfig.components.bundles);
    const fakeWebpack = sandbox.stub();
    const fakeSsrHelper = sandbox.stub();
    const fakeFs = { write: sandbox.stub() };

    beforeEach(() => {
      generator = proxyquire('./generateBundles',  {
        '../app/lib/getComponentInfo': fakeGetComponentInfo,
        '../app/config': fakeGetConfig,
        './webpack': fakeWebpack,
        './ssr-helper': fakeSsrHelper,
        'fs': fakeFs,
      });
    });

    afterEach(() => {
      sandbox.reset();
    });

    after(() => {
      sandbox.restore();
    });

    it('runs webpack to bundle components', () => {
      return generator.then(() => {
        const entry = generator.createEntryPoints(fakeConfig.components.bundles, fakeConfig.components.bundles);
        const rules = generator.createTogaLoaderRules(fakeConfig.components.bundles);
        expect(fakeWebpack).to.have.been.called;
        expect(fakeWebpack).to.have.been.calledWith({ minify: !fakeConfig.dev, entry, rules, staticComponents:fakeStaticComponents, commonsChunkName: fakeVendorName});
      });
    });
  });
});
