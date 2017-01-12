module.exports.assetUrl = () => {
  const assetsHost = process.env.TOGA_ASSETS_HOST;
  return assetsHost ? `//${assetsHost}/toga-assets/` : '';
};
