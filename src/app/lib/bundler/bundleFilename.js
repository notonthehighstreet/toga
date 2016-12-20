module.exports = (deps) => {
  return function bundleFilename(bundleName, { minify } = {}) {
    const {
      '/config/index': getConfig,
      '/lib/bundler/buildHash': buildHash
      } = deps;

    const { apiVersion } = getConfig();
    const togaHash = buildHash();
    return `${bundleName}-${togaHash}-${apiVersion}${minify ? '.min' : ''}`;
  };
};
