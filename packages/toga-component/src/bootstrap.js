const createT = require('./createT');

module.exports = ({phrases}, cb) => {
  const t = createT({phrases});

  cb({t});
};
