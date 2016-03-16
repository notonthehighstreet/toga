module.exports = (deps) => {
  return function getTogaStyles(req, res, next) {
    const {
      '/lib/getTogaStyles': getTogaStylesLib
      } = deps;

    return getTogaStylesLib()
      .then(
        (cssContent)=>{
          res.set('Content-Type', 'text/css').send(cssContent);
        },
        (error) => {
          next(error);
        }
    );
  };
};
