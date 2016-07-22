module.exports = (deps) => {
  return function buildBundleHash(components) {
    const {
      'hash-files': hashFiles,
      'es6-promisify': promisify,
      '/lib/getAppConfig': getAppConfig
    } = deps;
    let { componentsPath } = getAppConfig();
    if (componentsPath[0] === '.') {
      componentsPath = componentsPath.slice(2);
    }

    const componentsPaths = [].concat(components).map((component) =>`${componentsPath}/${component}/**`);

    const promiseHash = promisify(hashFiles.bind(hashFiles));
    return promiseHash({files: componentsPaths});
  };
};
