var Mocha = require('mocha'),
  fs = require('fs'),
  path = require('path');


var DEFAULT_CASE_TIMEOUT = 16000;
var TEST_DIR = 'test';

var mocha = new Mocha({
  timeout: DEFAULT_CASE_TIMEOUT
});

// Add each .js file to the mocha.
fs
  .readdirSync(TEST_DIR).filter(function (file) {
    return file.substr(-3) === '.js';
  })
  .forEach(function (file) {
    mocha.addFile(
      path.join(TEST_DIR, file)
    );
  });

mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});