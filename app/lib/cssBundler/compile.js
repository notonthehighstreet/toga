module.exports = (deps) => {
  return function compile() {
    const {
      '/lib/cssBundler/sass/compile': sassCompile
    } = deps;

    return sassCompile.apply(null, arguments);
  };
};
