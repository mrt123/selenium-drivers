var Driver = require('./Driver');
var fs = require('fs');
var path = require('path');

module.exports = {
    download : download
};

function download(driverName) {

    var request = require('request');

    var driver = new Driver(driverName);

    console.log('downloading: ' + driver.sourceFilename);
    var activeDownloadRequest = request(driver.url);

    var downloadedFileReference = path.join(__dirname, '../downloads',driver.sourceFilename);
    console.log('downloadedFileReference: ' + downloadedFileReference);

    activeDownloadRequest
        .pipe(fs['createWriteStream'](downloadedFileReference));

    return activeDownloadRequest;
}
