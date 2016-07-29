import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import builder from '../../../../app/lib/createWebpackAssetsJson';
import { fakeFs, fakePromisify, fakeDebug, fakeResolve, fakePromise } from '../../commonMocks';

const sandbox = sinon.sandbox.create();
const chance = new Chance();
const componentsPath = chance.word();
const fakePathsExist = fakeResolve(true);
const fakeModulePaths = [ chance.file() ];
const fakeBundle = fakePromise;
let deps;

describe('create webpack assets json', () => {

  const component1 = chance.word();
  const component2 = chance.word();
  const result1 = chance.word();
  const result2 = chance.word();
  const components = [component1, component2];
  const file1 = componentsPath + '/' + component1 + '/' + 'webpack-assets.json';
  const file2 = componentsPath + '/' + component2 + '/' + 'webpack-assets.json';
  const writefile = componentsPath + '/' + 'webpack-assets.json';
  const jsonStr = JSON.stringify({[result2]:1, [result1]:1});

  beforeEach(() => {
    deps = {
      'es6-promisify': fakePromisify,
      'deep-assign': require('deep-assign'),
      'fs': fakeFs,
      'debug': fakeDebug,
      '/lib/bundler/bundle': fakeBundle,
      '/lib/bundler/createModulePaths': () => fakeModulePaths,
      '/lib/getAppConfig': sandbox.stub().returns({ componentsPath }),
      '/utils/pathsExist': fakePathsExist
    };
  });

  afterEach(() => {
    sandbox.reset();
  });

  context('when the individual component webpack-assets.json file exists', ()=>{
    it('loops components a calls fs.write containing a complete object', () => {
      const subject = builder(deps);
      fakeFs.readFile.returns(jsonStr);
      fakeFs.readFile.withArgs(file1).returns(JSON.stringify({ [result1]: 1}) );
      fakeFs.readFile.withArgs(file2).returns(JSON.stringify({ [result2]: 1}) );

      return subject(components).then(() => {
        expect(fakeFs.writeFile).to.have.been.calledWith(writefile, jsonStr, 'utf-8');
      });
    });
  });

  context('when there are no webpack-assets.json files', ()=>{
    it.skip('loops components a calls fs.write containing a complete object', () => {
      // const reject = fakeReject(new Error('test'))
      deps['/utils/pathsExist'] = sandbox.spy(() => {
        return Promise.reject(new Error('test'));
      });
      const subject = builder(deps);
      fakeFs.readFile.returns(jsonStr);
      fakeFs.readFile.withArgs(file1).returns(JSON.stringify({ [result1]: 1}) );
      fakeFs.readFile.withArgs(file2).returns(JSON.stringify({ [result2]: 1}) );

      return subject(components[0]).then(() => {
        // expect(reject).to.be.calledOnce;
        // expect(fakeReject).to.be.calledTwice
        // expect(fakeFs.writeFile).to.have.been.calledWith(writefile, jsonStr, 'utf-8');
      });
    });
  });
});
