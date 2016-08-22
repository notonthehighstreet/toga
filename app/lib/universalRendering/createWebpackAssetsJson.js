module.exports = (deps) => {
  return function createWebpackAssetsJson(components, assetsFile) {
    const {
      'es6-promisify': promisify,
      'deep-assign': deepAssign,
      'fs': fs,
      debug,
      path,
      '/lib/universalRendering/index': getUniversalRendering,
      '/lib/bundler/bundle': bundle,
      '/lib/utils/pathsExist': pathsExist
    } = deps;

    const log = debug('toga:CreateWebpackAssets'); // eslint-disable-line
    const universalRendering = getUniversalRendering();
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);

    // to do: work out how to deal with multiple repo;
    let componentsRoot;

    const getAssetsJson = ((component) => {
      componentsRoot = component.root;
      const isoPlugin = universalRendering.isoPlugin(component.path);
      const componentAssetFilePath = path.join(component.path, assetsFile);
      const modulePaths = components.map(component => component.file);
      return (pathsExist(componentAssetFilePath))
        .then((exists)=>{
          return exists
            ? readFile(componentAssetFilePath)
            : bundle([component], { isoPlugin, modulePaths, minify: false }).then(() => getAssetsJson(component));
        });
    });

    const readAssetFiles = components.map(getAssetsJson);
    const strToJson = results => results.map(jsonStr => JSON.parse(jsonStr));
    const combineAssetsJson = (json, allAssets) => deepAssign(allAssets, json);
    const combineAssetFiles = jsonArr => jsonArr.reduce(combineAssetsJson, {});
    const saveCombinedFile = json => writeFile(`${componentsRoot}/${assetsFile}`, JSON.stringify(json), 'utf-8');

    return Promise.all(readAssetFiles)
      .then(strToJson)
      .then(combineAssetFiles)
      .then(saveCombinedFile)
      .then(()=> componentsRoot);
  };
};
