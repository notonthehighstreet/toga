const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

module.exports = function addPrefixes(cssContent) {
  return postcss([autoprefixer]).process(cssContent).then((result) => result.css);
};
