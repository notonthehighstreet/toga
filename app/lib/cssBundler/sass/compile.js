module.exports = (deps) => {
  return function compile({stylesheetContent, includePaths}) {
    const {
      'node-sass': sass,
      'es6-promisify': promisify
    } = deps;
    const render = promisify(sass.render);

    return render({
      data: stylesheetContent,
      includePaths: includePaths
    })
      .then((parsed) => {
        return parsed.css;
      });
  };
};
