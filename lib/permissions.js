var path = require('path');
var fs = require('fs');

module.exports = {
    fix : fix
};

function fix(driver) {

    if (driver.os.name != 'win32' && driver.os.name != 'win64') {
        console.log('Fixing file permissions');
        fs.chmodSync(path.join(driver.downloadPath, driver.binaryFileName), '755')
    }
}
