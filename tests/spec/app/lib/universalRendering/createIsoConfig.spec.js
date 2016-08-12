import { expect } from 'chai';
import Chance from 'chance';
import builder from '../../../../../app/lib/universalRendering/createIsoConfig';

const chance = new Chance();
const fakeAssetsName = chance.file();
const componentName = chance.word();
const subject = builder({
  path: require('path')
});

describe('create iso config', () => {
  it('return json with a path matching the components dir', () => {
    const config = subject('.', fakeAssetsName);
    expect(config.webpack_assets_file_path.endsWith(`/components/${fakeAssetsName}`)).to.equal(true);
  });

  it('return json with a path matching a component within the components dir', () => {
    const config = subject(componentName, fakeAssetsName);
    expect(config.webpack_assets_file_path.endsWith(`/components/${componentName}/${fakeAssetsName}`)).to.equal(true);
  });
});