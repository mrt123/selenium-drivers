var download = require('./download');
var report = require('./report');
var extract = require('./extract');
var permissions = require('./permissions');
var pathPrep = require('./pathPrep');
var execution = require('./execution');


module.exports = {
    //download: download.download,
    //report: report.report,
    //extract: extract.extract,
    //fixPermissions: permissions.fix,
    //addToPath: pathPrep.addToPath,
    //run: execution.run
    run: run
};

function run(driverName) {

    var downloadRequest = download.download(driverName);
    return report.reportProgress(downloadRequest).then(function () {
        return this;
    }).catch(function(e) {
        console.log(e);
    });
}
