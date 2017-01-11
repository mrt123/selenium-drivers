var Driver = require('./Driver');
var download = require('./download');
var report = require('./report');
var permissions = require('./permissions');
var pathPrep = require('./pathPrep');
var execution = require('./execution');

module.exports = {
    driver: '',
    init: prepareForSelenium,
    start: start,
    stop: stop
};

function prepareForSelenium({download = true, name, deactivate = false}) {
    console.log('Prearing driver for browser: ' + name);

    var driver = new Driver(name);

    return new Promise(function (resolve, reject) {
        if (deactivate) {
            resolve();
        }
        else if (name === 'safari') {
            console.log('NOTICE: requires minimum OSX: ElCaptain & Safari 10.0!');
            resolve();
        }
        else {
            if (download) {
                handleDownload(driver, resolve, reject);
            }
            else {
                console.log('Driver download disabled, version will not be checked.')
            }
            pathPrep.addPathToEnvironment(driver.downloadPath);  // for selenium
            resolve();
        }
    });
}

function handleDownload(driver, callback, error) {
    
    download.getLastDriverVersion(driver).then(function (version) {

        driver.setVersion(version);
        
        if(driver.isUpToDate(version)) {
            console.log('Local driver is up to date!');
            callback();
        }
        else {
            var downloadSuccess = prepareDownloadedFile.bind(this, driver, callback);
            var downloadRequest = download.downloadDriverToDirectory(driver, '../downloads');
            report.reportProgress(downloadRequest);
            downloadRequest.on('end', downloadSuccess);
            downloadRequest.on('error', error);
        }
    });
}

function prepareDownloadedFile(driver, callback) {
    driver.extract().then(function () {
        permissions.fix(driver);
        callback();
    });
}

function start() {
    // TODO: start driver programmatically
}


function stop() {
    // TODO: stop driver programmatically
}
