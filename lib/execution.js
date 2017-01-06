var path = require('path');
var downloadPath = path.join(__dirname, '../downloads');


module.exports = {
    run : run
};



function run(driver) {
    console.log('running browser driver...');
    var binaryFilePath = path.join(downloadPath, driver.binaryFileName);
    exports.defaultInstance = require('child_process').execFile(binaryFilePath);
}
