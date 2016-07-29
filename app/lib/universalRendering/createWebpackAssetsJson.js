module.exports = (deps) => {
  return function createWebpackAssetsJson(components, assetsFile) {
    const {
      'es6-promisify': promisify,
      'deep-assign': deepAssign,
      'fs': fs,
      debug,
      '/lib/bundler/bundle': bundle,
      '/lib/utils/createModulePaths': createModulePaths,
      '/lib/getAppConfig': getAppConfig,
      '/lib/utils/pathsExist': pathsExist
    } = deps;

    const log = debug('toga:CreateWebpackAssets');
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    const { componentsPath } = getAppConfig();

    const getAssetsJson = ((component) => {
      const path = createModulePaths(component, assetsFile);
      return (pathsExist(path)).then(()=>{
        return readFile(path[0]);
      }).catch(() => {
        log(`creating assetsFile for ${component}`);
        return bundle(component, { minify: false }).then(() => getAssetsJson(component));
      });
    });

    const readAssetFiles = components.map(getAssetsJson);
    const strToJson = results => results.map(jsonStr => JSON.parse(jsonStr));
    const combineAssetsJson = (json, allAssets) => deepAssign(allAssets, json);
    const combineAssetFiles = jsonArr => jsonArr.reduce(combineAssetsJson, {});
    const saveCombinedFile = json => writeFile(`${componentsPath}/${assetsFile}`, JSON.stringify(json), 'utf-8');

    return Promise.all(readAssetFiles)
      .then(strToJson)
      .then(combineAssetFiles)
      .then(saveCombinedFile);
  };
};
