var fs = require('fs');
var glob = require('glob');

glob('components/**/webpack-assets.json', {}, function(err, files) {
  files.forEach(function(file) {
    fs.unlink(file, function() {
      console.log(file + ' deleted'); // eslint-disable-line
    });
  });
});
