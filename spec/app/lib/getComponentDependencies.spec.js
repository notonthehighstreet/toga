const expect = require('chai').expect;
const builder = require('../../../app/lib/getComponentDependencies.js');
const subject = builder({
  lodash: require('lodash')
});

describe('getComponentDependencies', () => {
  describe('component has no children', () => {
    const componentName = 'steve';
    const manifestJson = {
      name: componentName,
      children: []
    };

    it('returns itself as a dependency', () => {
      expect(subject(manifestJson)).to.deep.equal([componentName]);
    });
  });

  describe('component has children', () => {
    const componentName = 'steve';
    const children = ['bob', 'max'];
    const manifestJson = {
      name: componentName,
      children: children
    };

    it('returns itself as a dependency', () => {
      expect(subject(manifestJson)).to.include(componentName);
    });
    it('returns its children as dependencies', () => {
      expect(subject(manifestJson)).to.include.members(children);
    });
  });
  describe('component has child descendants with common dependencies', () => {
    const componentName = 'steve';

    it('prevents duplicate dependencies from being defined more than once', () => {
      const children = ['bob', 'bob'];
      const manifestJson = {
        name: componentName,
        children: children
      };

      expect(subject(manifestJson)).to.deep.equal(['steve', 'bob']);
    });
  });
});
