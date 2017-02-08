const { assets, aws } = require('../../app/config/application');

function cdn() {
  if (assets.url) {
    return `//${assets.url}/`;
  }
  if (assets.host) {
    return `//${assets.host}/${assets.prefix}/`;
  }
  return '';
}

function s3() {
  if (assets.url) {
    return `//${assets.url}/`;
  }
  if (aws.bucket) {
    return `//${aws.bucket}.s3.amazonaws.com/${assets.prefix}/`;
  }
  return '';
}

module.exports = {
  cdn,
  s3
};
