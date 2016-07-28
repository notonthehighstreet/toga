module.exports = (deps) => {
  return function preCacheComponentBundleCacheHash() {
    const {
      '/lib/buildBundleHash': buildBundleHash
    } = deps;

    return buildBundleHash;
  };
};
