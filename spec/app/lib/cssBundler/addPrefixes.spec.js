const expect = require('chai').expect;
const chance = new require('chance')();
const builder = require('../../../../app/lib/cssBundler/addPrefixes');

describe('addPrefixes', () => {
  const cssContent = chance.word();
  const processSuccess = () => {
    return Promise.resolve({
      css: cssContent
    });
  };
  let deps;
  let subject;

  beforeEach(() => {
    deps = {
      postcss: function() {
        return {
          process: processSuccess
        };
      }
    };
    subject = builder(deps);
  });

  describe('when CSS content is passed', () => {
    it('prefixes and returns the resultant CSS', () => {
      const result = subject(cssContent);

      return result.then((prefixedCss) => {
        return expect(prefixedCss).to.be.eq(cssContent);
      });
    });
  });
});
