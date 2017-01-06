var path = require('path');
var downloadPath = path.join(__dirname, '../downloads');


module.exports = {
    run : run
};



function run(driver) {
    console.log('running browser driver...');
    var binaryFilePath = path.join(downloadPath, driver.binaryFileName + getBinaryFileExtension());
    exports.defaultInstance = require('child_process').execFile(binaryFilePath);
}


function getBinaryFileExtension() {
    return process.platform === 'win32' ? '.exe' : '';
}