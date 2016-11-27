var path = require('path');
var pathToBinary = path.join(__dirname);



var seleniumDriverCore = require('./lib/selenium-drivers.js');

module.exports = {
    download: seleniumDriverCore.prepareFile,
    run: run
};

var fileReference = getFileReference(pathToBinary);

function run() {
    exportPath(pathToBinary);
    console.log('running browser driver...');
    exports.defaultInstance = require('child_process').execFile(fileReference);
}

function exportPath(pathToExport) {
    process.env.PATH += path.delimiter + pathToExport;
}

function getFileReference(pathToBinary) {
    var isWindows = process.platform === 'win32';
    var fileExtension = '';
    if (isWindows) {
        fileExtension = '.exe';
    }
    return path.join(pathToBinary, 'chromedriver' + fileExtension);
}

