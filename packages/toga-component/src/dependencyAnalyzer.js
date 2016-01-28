const _ = require('lodash');

module.exports = ({phrases}) => {
  const polyglot = new Polyglot({phrases});

  return polyglot.t.bind(polyglot);
};
