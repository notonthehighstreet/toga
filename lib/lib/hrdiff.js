module.exports = function hrdiff(hrtime) {
  const diff = process.hrtime(hrtime);
  const elapsed = (diff[0]*1e9 + diff[1]) / 1e3;

  return parseInt(elapsed.toFixed(0), 10);
};
