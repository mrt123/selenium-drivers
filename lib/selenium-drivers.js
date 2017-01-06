var Driver = require('./Driver');
var download = require('./download');
var report = require('./report');
var extract = require('./extract');
var permissions = require('./permissions');
var pathPrep = require('./pathPrep');
var execution = require('./execution');

/**
 * TODO: '../downloads' should definitely be present only once (removes impact of typo's)
 * 
 */


module.exports = {

    run: run
};

function run(driverName) {

    var driver = new Driver(driverName);

    var downloadRequest = download.downloadDriverToDirectory(driver, '../downloads');
    report.reportProgress(downloadRequest);

    return new Promise(function (resolve, reject) {
        downloadRequest.on('end', function () {

            extract.extract(driver);
            pathPrep.addBinPathToEnvironment();

            permissions.fix(driver);
            execution.run(driver);
            resolve();
        });
        downloadRequest.on('error', reject);
    });
}
