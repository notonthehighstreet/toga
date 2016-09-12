let hash;
module.exports = (deps) => {
  return function buildHash(paths) {
    const {
      'hash-files': hashFiles
    } = deps;

    const files = paths.map(path => `${path}/**/*(!(*.webpack-assets.json))`);
    hash = hash || hashFiles.sync({ files });
    return hash;
  };
};
