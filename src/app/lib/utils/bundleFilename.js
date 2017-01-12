let builtHash;
module.exports = (deps) => {

  return function bundleFilename(bundleName, { minify } = {}) {

    const {
      'hash-files': hashFiles,
      '/config/index': getConfig
      } = deps;
    const { components } = getConfig();

    function buildHash({ path, packageJson }) {
      const files = [`${path}/**/*`, packageJson, './package.json'];
      builtHash = builtHash || hashFiles.sync({ files });
      return builtHash;
    }

    const hash = buildHash(components);
    return `${bundleName}-${hash}${minify ? '.min' : ''}`;
  };
};
