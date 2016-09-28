import { expect } from 'chai';
import Chance from 'chance';
import builder from './createIsoConfig';

const chance = new Chance();
const fakeAssetsName = chance.file();
const assetPath = `${chance.word()}/${chance.word()}`;
const subject = builder({
  path: require('path')
});

describe('create iso config', () => {
  it('return json with a path matching the components dir', () => {
    const config = subject(assetPath, fakeAssetsName);
    expect(config.webpack_assets_file_path.endsWith(`${assetPath}/${fakeAssetsName}`)).to.equal(true);
  });
});
