import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import builder from '../../../../app/lib/createWebpackAssetsJson';
import { fakeFs, fakePromisify } from '../../commonMocks';

const sandbox = sinon.sandbox.create();
const chance = new Chance();
const componentsPath = chance.word();
const subject = builder({
  'es6-promisify': fakePromisify,
  'deep-assign': require('deep-assign'),
  'fs': fakeFs,
  '/lib/getAppConfig': sandbox.stub().returns({ componentsPath })
});

describe('create webpack assets json', () => {

  it('loops components a calls fs.write containing a complete object', () => {
    const component1 = chance.word();
    const component2 = chance.word();
    const result1 = chance.word();
    const result2 = chance.word();
    const components = [component1, component2];
    const file1 = componentsPath + '/' + component1 + '/' + 'webpack-assets.json';
    const file2 = componentsPath + '/' + component2 + '/' + 'webpack-assets.json';
    const writefile = componentsPath + '/' + 'webpack-assets.json';

    fakeFs.readFile.withArgs(file1).returns(JSON.stringify({ [result1]: 1}) );
    fakeFs.readFile.withArgs(file2).returns(JSON.stringify({ [result2]: 1}) );

    return subject(components).then(() => {
      expect(fakeFs.writeFile).to.have.been.calledWith(writefile, JSON.stringify({[result2]:1, [result1]:1}), 'utf-8');
    });
  });

});
