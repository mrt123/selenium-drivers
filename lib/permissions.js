var path = require('path');
var fs = require('fs');
var downloadPath = path.join(__dirname, '../downloads');

module.exports = {
    fix : fix
};

function fix(driver) {

    if (driver.os.name != 'win32') {
        console.log('Fixing file permissions');
        fs.chmodSync(path.join(downloadPath, driver.binaryFileName), '755')
    }
}