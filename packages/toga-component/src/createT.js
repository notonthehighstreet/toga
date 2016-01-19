const Polyglot = require('node-polyglot');

module.exports = ({phrases}) => {
  const polyglot = new Polyglot({phrases});

  return polyglot.t.bind(polyglot);
}