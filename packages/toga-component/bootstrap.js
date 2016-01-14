const createT = require('./lib/createT');

module.exports = ({phrases}, cb) => {
  const t = createT({phrases});

  cb({t});
};
