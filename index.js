var path = require('path');
var pathToBinary = path.join(__dirname);

exportPath(pathToBinary);

var fileReference = getFileReference(pathToBinary);

exports.defaultInstance = require('child_process').execFile(fileReference);

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

