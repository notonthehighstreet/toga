module.exports = (deps) => {
  return function createWebpackAssetsJson(components) {
    const {
      'es6-promisify': promisify,
      'deep-assign': deepAssign,
      'fs': fs,
      '/lib/getAppConfig': getAppConfig
    } = deps;

    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    const { componentsPath } = getAppConfig();
    const assetsFile = 'webpack-assets.json';

    const readAssetFiles = components.map(name => readFile(`${componentsPath}/${name}/${assetsFile}`));
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
