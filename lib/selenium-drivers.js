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

function prepareForSelenium(opts) {
    
    opts.download = opts.download === undefined ? true : opts.download; 

    var driver = new Driver(opts.name);

    return new Promise(function (resolve, reject) {
        
        if (opts.download) {
            var downloadSuccess = prepareDownloadedFile.bind(this, driver, resolve);
            handleDownload(driver, downloadSuccess, reject);
        }
        else {
            prepareDownloadedFile(driver, resolve);
        }
    });
}

function handleDownload(driver, success, error) {
    var downloadRequest = download.downloadDriverToDirectory(driver, '../downloads');
    report.reportProgress(downloadRequest);
    downloadRequest.on('end', success);
    downloadRequest.on('error', error);
}

function prepareDownloadedFile(driver, callback) {
    driver.extract().then(function () {
        pathPrep.addPathToEnvironment(driver.downloadPath);  // for selenium
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
