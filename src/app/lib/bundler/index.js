module.exports = (deps) => {

  return function togaBundle(componentNames, opts = {}) {
    const {
      '/lib/bundler/bundle': bundle,
      '/lib/utils/errors': { BundleError }
    } = deps;

    return bundle(componentNames, opts)
      .catch((err) => {
        throw new BundleError(err.message);
      });
  };
};
