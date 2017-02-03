/*eslint no-unused-vars: [2, { "argsIgnorePattern": "next" }]*/
module.exports = (deps) => {
  return function errorHandler(err, req, res, next) {
    const {
      '/logger': getLogger,
      '/lib/getComponentInfo': getComponentInfo
    } = deps;
    const components = getComponentInfo().map(component => component.name);
    const logger = getLogger();
    const errObj = {
      status: res.statusCode,
      err
    };
    switch (err.name) {
    case 'NotFoundError' :
      res.status(404).send(`<h1>404</h1>
          <p>${err.message.toString()}</p>
          <h2>Which component were you looking for?</h2>
          <ul>${components.map(component => `<li><a href="/${component}.preview.html">${component}</a></li>`).join('')}</ul>
      `);
      logger.warn(errObj);
      break;
    case 'BadRequestError' :
      res.status(400).send(err.message.toString());
      logger.error(errObj);
      break;
    default :
      res.status(500).send(err.toString());
      logger.error(errObj);
    }
  };
};
