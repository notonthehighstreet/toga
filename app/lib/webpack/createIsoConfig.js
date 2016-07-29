/*eslint camelcase: ["error", {properties: "never"}]*/
module.exports = (deps) => {
  return function createConfig(component) {
    const { path } = deps;
    return {
      webpack_assets_file_path: path.join(__dirname, '..', '..', '..', 'components', component, '/webpack-assets.json'),
      assets: {
        asset_type: {
          extension: 'svg',
          parser(module) {
            if (module.source) {
              const regex = /module\.exports = "((.|\n)*)"/;
              const match = module.source.match(regex);
              return (match ? match[1] : '').replace(/\\/g, '');
            }
          }
        }
      }
    };
  };
};
