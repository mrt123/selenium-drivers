var path = require('path');

module.exports = {
  run: run
};


function run(driver) {
  console.log('running browser driver...');
  var binaryFilePath = path.join(driver.downloadPath, driver.binaryFileName);
  exports.defaultInstance = require('child_process').execFile(binaryFilePath);
}