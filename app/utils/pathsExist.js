module.exports = (deps) => {

  const {
    fs,
    'es6-promisify': promisify,
    '/logger': getLogger
  } = deps;

  return function pathsExists(paths) {
    const stat = promisify(fs.stat);
    const logger = getLogger();
    const promises = paths.map((path) => stat(path));
    return Promise.all(promises)
      .catch((statErr) => {
        logger.error('Path not found:', statErr);
        throw statErr;
      });
  };
};
