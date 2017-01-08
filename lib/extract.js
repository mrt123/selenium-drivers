var path = require('path');

module.exports = {
    extract: unzip
};

function extract(driver) {
    this.unzip(driver);
}

function unzip(driver) {

    console.log('Extracting archive contents');

    var AdmZip = require('adm-zip');

    var zip = new AdmZip(path.join(driver.downloadPath, driver.archiveFileName));
    zip.extractAllTo(driver.downloadPath, true);
    
    var entries = zip.getEntries();
    return entries[0].entryName;
}
