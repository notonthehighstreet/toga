const SvgLoader = require('svg-inline-loader');
const IsomorphicTools = require('webpack-isomorphic-tools');
const hook = require('node-hook');

hook.hook('.scss', () => {});
hook.hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return 'module.exports = ' + JSON.stringify(markup);
});
export const isoConfig = { assets: { images: { extensions: ['png', 'jpg', 'gif', 'ico'] } } };
const isoTools = new IsomorphicTools(isoConfig);

module.exports.isoConfig = isoConfig;
module.exports = () => Promise.resolve()
  .then(() => {
    return isoTools.server(process.cwd());
  });
