let hash;
module.exports = (deps) => {
  return function buildHash() {
    const {
      'hash-files': hashFiles,
      '/config/index': getConfig
    } = deps;
    const config = getConfig();

    const files = `${config.components.path}/**/*(!(webpack-assets.json))`;
    hash = hash || hashFiles.sync({ files });
    return hash;
  };
};
