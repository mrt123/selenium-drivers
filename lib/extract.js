var log = require('./log');
var path = require('path');

module.exports = {
  extract: extract
};

function extract(driver) {

  log.infoIf(!driver.opts.silent, 'Extracting archive contents');

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
  var AdmZip = require('adm-zip');

  var zip = new AdmZip(driver.archivePath);
  zip.extractAllTo(driver.downloadPath, true);

  var entries = zip.getEntries();
  var entryName = entries[0].entryName;
  log.infoIf(!driver.opts.silent, 'Extracted new file: ' + entryName);
  return entryName;
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
        log.infoIf(!driver.opts.silent, 'Extracted new file: ' + entryName);
        resolve(entryName);
      }, 100);
    });
  });
}

