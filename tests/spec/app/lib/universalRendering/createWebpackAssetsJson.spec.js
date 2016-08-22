import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import builder from '../../../../../app/lib/universalRendering/createWebpackAssetsJson';
import { fakeFs, fakePromisify, fakeDebug, fakeResolve, fakePromise } from '../../../commonMocks';

const sandbox = sinon.sandbox.create();
const chance = new Chance();
const assetsFileName = chance.file();
const fakePathsExist = fakeResolve(true);
const fakeBundle = fakePromise;

let fakeComponentName = chance.word();
const fakeRelativeComponentPath = `../../components/${fakeComponentName}`;
const componentRoot = chance.word();
const fakeComponentInfo = [{ requirePath : fakeRelativeComponentPath, path : chance.word(),  file: chance.file(),  name: chance.word(), root: componentRoot }];

let deps;

describe('create webpack assets json', () => {

  const component1 = chance.word();
  const component2 = chance.word();
  const result1 = chance.word();
  const result2 = chance.word();
  const components = [component1, component2];
  const file1 = fakeRelativeComponentPath + '/' + component1 + '/' + assetsFileName;
  const file2 = fakeRelativeComponentPath + '/' + component2 + '/' + assetsFileName;
  const writefile = componentRoot + '/' + assetsFileName;
  const jsonStr = JSON.stringify({[result2]:1, [result1]:1});

  beforeEach(() => {
    deps = {
      'es6-promisify': fakePromisify,
      'deep-assign': require('deep-assign'),
      'fs': fakeFs,
      'debug': fakeDebug,
      '/lib/bundler/bundle': fakeBundle,
      'path': require('path'),
      '/lib/universalRendering/index': sandbox.stub().returns({isoPlugin: () => {}}),
      '/lib/utils/componentHelper': {
        bundleId: sandbox.stub().returns(fakeComponentName)
      },
      '/config/index': { fakeRelativeComponentPath },
      '/lib/utils/pathsExist': fakePathsExist
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

      return subject(fakeComponentInfo, assetsFileName).then(() => {
        expect(fakeFs.writeFile).to.have.been.calledWith(writefile, jsonStr, 'utf-8');
      });
    });
  });

  context('when there are no webpack-assets.json files', ()=>{
    it.skip('loops components a calls fs.write containing a complete object', () => {
      // const reject = fakeReject(new Error('test'))
      deps['/lib/utils/pathsExist'] = sandbox.spy(() => {
        return Promise.reject(new Error('test'));
      });
      const subject = builder(deps, assetsFileName);
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
