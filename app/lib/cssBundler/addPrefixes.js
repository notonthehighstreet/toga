module.exports = (deps) => {
  return function addPrefixes(cssContent) {
    const {
      postcss,
      autoprefixer
    } = deps;

    return postcss([autoprefixer]).process(cssContent).then((result) => result.css);
  };
};
