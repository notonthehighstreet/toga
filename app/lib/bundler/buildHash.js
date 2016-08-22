let hash;
module.exports = (deps) => {
  return function buildHash(paths) {
    const {
      'hash-files': hashFiles
    } = deps;

    const files = paths.map(path => {
      const glob = (path[0] === '.') ? path.slice(2) : path;
      return `${glob}/**/*(!(*.webpack-assets.json))`;
    });
    hash = hash || hashFiles.sync({ files });
    return hash;
  };
};
