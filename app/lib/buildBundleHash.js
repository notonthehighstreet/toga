module.exports = (deps) => {
  let hash;
  return function buildBundleHash() {
    const {
      'hash-files': hashFiles,
      'es6-promisify': promisify,
      '/lib/getAppConfig': getAppConfig
    } = deps;
    let { componentsPath } = getAppConfig();
    if (componentsPath[0] === '.') {
      componentsPath = componentsPath.slice(2);
    }
    if(hash) {
      return Promise.resolve(hash);
    }

    const componentsPaths = [`${componentsPath}/**/*`];

    const promiseHash = promisify(hashFiles.bind(hashFiles));
    return promiseHash({files: componentsPaths})
      .then((_hash) => {
        hash = _hash;
        return hash;
      });
  };
};
