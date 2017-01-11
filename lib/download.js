var fs = require('fs');
var path = require('path');
var request = require('request');

module.exports = {
    downloadDriverToDirectory : downloadDriverToDirectory,
    checkLastDriverVersion : checkLastDriverVersion,
};

function downloadDriverToDirectory(driver, downloadDirectory) {

    console.log('downloading: ' + driver.url);
    console.log('... to localPath: ' + downloadDirectory);

    var activeDownloadRequest = request(driver.url);

    var osSpecificDownloadPath = getOsSpecificPath(driver, downloadDirectory);

    activeDownloadRequest
        .pipe(fs.createWriteStream(osSpecificDownloadPath));

    return activeDownloadRequest;
}

function checkLastDriverVersion(driver) {
    if(driver.name === 'chrome') {
        return _checkLastChromeDriverVersion();
    }
    else if(driver.name === 'firefox') {
        return _checkLastFirefoxDriverVersion();
    }
}

function _checkLastChromeDriverVersion() {
    var url = 'http://chromedriver.storage.googleapis.com/LATEST_RELEASE';
    
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var version = body.replace('\n', '');
                resolve(version);
            }
            else {
                reject();
            }
        });
    });
}

function _checkLastFirefoxDriverVersion() {
    var url = 'https://github.com/mozilla/geckodriver/releases/latest';
    return new Promise(function (resolve, reject) {
        request({json: true, url: url}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body.tag_name);
            }
            else {
                reject();
            }
        });
    });
}

function getOsSpecificPath(driver, downloadDirectory) {
    return require('path').join(__dirname, downloadDirectory, driver.archiveFileName);
}
