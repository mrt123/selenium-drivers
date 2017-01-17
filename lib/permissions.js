var log = require('./log');
var path = require('path');
var fs = require('fs');

module.exports = {
  fix: fix
};

function fix(driver) {

  if (driver.os.name != 'win32' && driver.os.name != 'win64') {
    log.infoIf(!driver.opts.silent, 'Fixing file permissions');
    fs.chmodSync(path.join(driver.downloadPath, driver.binaryFileName), '755')
  }
}
