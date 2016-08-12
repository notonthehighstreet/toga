let hash;
module.exports = (deps) => {
  return function buildHash(path) {
    const {
      'hash-files': hashFiles
    } = deps;

    const glob = (path[0] === '.') ? path.slice(2) : path;

    hash = hash || hashFiles.sync({files: [`${glob}/**/*(!(*.webpack-assets.json))`]});
    return hash;
  };
};