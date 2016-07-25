module.exports = (deps) => {
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

    const componentsPaths = [`${componentsPath}/**/*`];

    const promiseHash = promisify(hashFiles.bind(hashFiles));
    return promiseHash({files: componentsPaths});
  };
};
