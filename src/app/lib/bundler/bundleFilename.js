module.exports = (deps) => {
  return function bundleFilename(componentNames, { minify = false }) {
    const {
      '/config/index': getConfig,
      '/lib/bundler/buildHash': buildHash,
      '/lib/utils/componentHelper': componentHelper,
      } = deps;

    const { apiVersion } = getConfig();
    const togaHash = buildHash();
    return `${apiVersion}-${togaHash}-${componentHelper.bundleId(componentNames, { minify })}`;
  };
};
