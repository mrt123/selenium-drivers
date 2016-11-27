var Driver = new require('./Driver');
var driver = new Driver(2.25);
var fs = require('fs');

module.exports = {
    prepareFile : prepareFile
};

function prepareFile() {

    var downloadRequest = downloadDriver(driver);
    downloadRequest.on('end', function () {
        unzipDriver(driver)
            .then(fixDriverFilePermissions);
    });
}

function downloadDriver(driver) {

    var request = require('request');

    console.log('downloading: ' + driver.sourceFilename);
    var activeFileRequest = request(driver.url);
    activeFileRequest
        .pipe(fs['createWriteStream'](driver.sourceFilename));

    return reportProgress(activeFileRequest);
}

function reportProgress(activeFileRequest) {
    const reporter = createReporter();
    const progressLib = require('request-progress');

    return progressLib(activeFileRequest)
        .on('progress', function (state) {
            var number = (state['percentage'] * 100).toFixed(2);
            reporter.reportProgress('Received: ' + number + '%');
        })
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {
            reporter.reportFinal('Received: 100%');
        });
}

function createReporter() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return {
        reportProgress: function reportProgress(progressString) {
            rl.write(null, {ctrl: true, name: 'u'});   // Simulate Ctrl+u to delete the line written previously
            rl.write(progressString);
        },
        reportFinal: function (progressString) {
            this.reportProgress(progressString);
            rl.write(null, {name: 'enter'});
            rl.close();
        }
    }
}

function unzipDriver(driver) {

    return new Promise(function (resolve, reject) {
        console.log('Extracting zip contents');

        var AdmZip = require('adm-zip');

        var zip = new AdmZip(driver.sourceFilename);
        zip['extractAllTo']('.', true);
        resolve(driver);
    });
}

function fixDriverFilePermissions(driver) {

    if (driver.os.name != 'win32') {
        console.log('Fixing file permissions');
        fs.chmodSync('./' + driver.targetFileName, '755')
    }
}



