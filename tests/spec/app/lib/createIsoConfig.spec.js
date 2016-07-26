import { expect } from 'chai';
import Chance from 'chance';
import builder from '../../../../app/lib/createIsoConfig';

const chance = new Chance();
const componentName = chance.word();
const subject = builder({
  path: require('path')
});

describe('create iso config', () => {
  it('return json with a path matching the components dir', () => {
    const config = subject('.');
    expect(config.webpack_assets_file_path.endsWith('/components/webpack-assets.json')).to.equal(true);
  });

  it('return json with a path matching a component within the components dir', () => {
    const config = subject(componentName);
    expect(config.webpack_assets_file_path.endsWith(`/components/${componentName}/webpack-assets.json`)).to.equal(true);
  });
});
