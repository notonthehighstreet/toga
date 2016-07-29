module.exports = (deps) => {

  const {
    fs,
    'es6-promisify': promisify
  } = deps;

  return function pathsExists(paths) {
    const stat = promisify(fs.stat);
    const promises = [].concat(paths).map((path) => stat(path));
    return Promise.all(promises);
  };
};
