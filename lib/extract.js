var path = require('path');

module.exports = {
    extract : extract
};


function extract(driver) {

    return new Promise(function (resolve, reject) {
        console.log('Extracting archive contents');

        var AdmZip = require('adm-zip');
        var downloadPath = path.join(__dirname, '../downloads');

        var zip = new AdmZip(path.join(downloadPath, driver.archiveFileName));
        zip.extractAllTo( downloadPath, true);
        resolve(driver);
    });
}
