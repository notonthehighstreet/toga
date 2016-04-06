module.exports = (deps) => {
  return function compile({stylesheetContent, includePaths}) {
    const {
      'node-sass': sass,
      'es6-promisify': promisify,
      '/lib/getAppConfig': getAppConfig
    } = deps;
    const render = promisify(sass.render);
    const {minify} = getAppConfig();

    return render({
      data: stylesheetContent,
      includePaths: includePaths,
      outputStyle: minify ? 'compressed' : 'nested'
    })
      .then((parsed) => {
        return parsed.css;
      });
  };
};
