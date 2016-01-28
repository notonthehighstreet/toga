const expect = require('chai').expect;
const subject = require('../../../lib/lib/getComponentDependencies.js');

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
  describe('component has duplicate dependencies', () => {
    const componentName = 'steve';

    it('dedupes parent and child dependencies', () => {
      const children = ['steve'];
      const manifestJson = {
        name: componentName,
        children: children
      };

      expect(subject(manifestJson)).to.deep.equal(['steve']);
    });
    it('dedupes child dependencies', () => {
      const children = ['bob', 'bob'];
      const manifestJson = {
        name: componentName,
        children: children
      };

      expect(subject(manifestJson)).to.deep.equal(['steve', 'bob']);
    });
  });
});