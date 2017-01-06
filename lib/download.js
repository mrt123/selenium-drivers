var fs = require('fs');
var path = require('path');

module.exports = {
    downloadDriverToDirectory : downloadDriverToDirectory
};

function downloadDriverToDirectory(driver, downloadDirectory) {

    console.log('downloading: ' + driver.url);
    console.log('... to localPath: ' + downloadDirectory);


    var request = require('request');
    var activeDownloadRequest = request(driver.url);

    var osSpecificDownloadPath = getOsSpecificPath(driver, downloadDirectory);

    // TODO: create download directory!

    activeDownloadRequest
        .pipe(fs.createWriteStream(osSpecificDownloadPath));

    return activeDownloadRequest;
}

function getOsSpecificPath(driver, downloadDirectory) {
    return require('path').join(__dirname, downloadDirectory, driver.archiveFileName);
}
