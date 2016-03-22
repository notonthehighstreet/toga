const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../../app/lib/cssBundler/sass/compileBundle');

describe('compileBundle', () => {
  const sandbox = sinon.sandbox.create();
  const scssFileContent = chance.word();
  const promisifyStub = sandbox.stub();
  const compileSpy = sandbox.stub();
  const readFileSuccess = () => {
    return Promise.resolve(scssFileContent);
  };
  let deps;
  let subject;

  beforeEach(() => {
    deps = {
      'fs': {},
      'es6-promisify': promisifyStub,
      '/lib/cssBundler/sass/compile': compileSpy
    };
    promisifyStub.returns(readFileSuccess);
    subject = builder(deps);
  });
  describe('when multiple components are requested', () => {
    const componentNames = chance.pickset([
      chance.word(),
      chance.word(),
      chance.word()
    ], 2);

    it('compiles SCSS for components', () => {
      const result = subject({componentNames});
      const expectedFirstStylesheetExpression = `\.toga-${componentNames[0]} {`;
      const expectedSecondStylesheetExpression = `\.toga-${componentNames[1]} {`;
      const expectedFirstStylesheetMatcher = new RegExp(expectedFirstStylesheetExpression, 'g');
      const expectedSecondStylesheetMatcher = new RegExp(expectedSecondStylesheetExpression, 'g');
      const expectedIncludePaths = [
        `./components/${componentNames[0]}`,
        `./components/${componentNames[1]}`,
        'node_modules'
      ];

      return result.then(() => {
        const actualStylesheetContent = compileSpy.args[0][0].stylesheetContent;
        const actualIncludePaths = compileSpy.args[0][0].includePaths;
        return [
          expect(actualStylesheetContent).to.match(expectedFirstStylesheetMatcher),
          expect(actualStylesheetContent).to.match(expectedSecondStylesheetMatcher),
          expect(actualIncludePaths).to.deep.equal(expectedIncludePaths)
        ];
      });
    });
  });
});
