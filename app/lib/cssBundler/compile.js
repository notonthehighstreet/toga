module.exports = (deps) => {
  return function compile() {
    const {
    '/lib/cssBundler/sass/compile': compileSass
    } = deps;

    return compileSass.apply(null, arguments);
  };
};
