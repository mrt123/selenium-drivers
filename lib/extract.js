var path = require('path');

module.exports = {
    extract: extract
};

function extract(driver) {

    return new Promise(function (resolve, reject) {
        if (driver.archiveFileName.indexOf('zip') >= 0) {
            var entry = unzip(driver);
            resolve(entry);
        }
        if (driver.archiveFileName.indexOf('tar.gz') >= 0) {
            resolve(untar(driver));
        }
    });


}

function unzip(driver) {

    console.log('Extracting archive contents');

    var AdmZip = require('adm-zip');

    var zip = new AdmZip(driver.archivePath);
    zip.extractAllTo(driver.downloadPath, true);

    var entries = zip.getEntries();
    return entries[0].entryName;
}


function untar(driver) {

    var targz = require('tar.gz');
    var fs = require('fs');

    var parse = targz().createParseStream();

    var entryName;   // affected by temporal dependency!
    parse.on('entry', function (entry) {
        entryName = entry.path;
    });


    var readStream = fs.createReadStream(driver.archivePath);
    readStream.pipe(parse);

    return new Promise(function (resolve) {

        var extract = targz().extract(readStream, driver.downloadPath);
        extract.then(function () {
            setTimeout(function () {
                resolve(entryName);
            }, 100);
        });
    });
}

