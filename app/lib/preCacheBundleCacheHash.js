module.exports = (deps) => {
  return function preCacheComponentBundle() {
    const {
      '/lib/buildBundleHash': buildBundleHash
    } = deps;

    return buildBundleHash;
  };
};
