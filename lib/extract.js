module.exports = {
    extract : unzipDriver
};



function unzipDriver(driver) {

    return new Promise(function (resolve, reject) {
        console.log('Extracting zip contents');

        var AdmZip = require('adm-zip');

        var zip = new AdmZip(downloadedFileReference);
        zip['extractAllTo']( path.join(__dirname, '../downloads'), true);
        resolve(driver);
    });
}
