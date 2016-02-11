const sass = require('node-sass');
const promisify = require('es6-promisify');
const render = promisify(sass.render);

module.exports = function compile({stylesheetContent, includePaths}) {
  return render({
    data: stylesheetContent,
    includePaths: includePaths
  })
    .then((parsed) => {
      return parsed.css;
    });
};
