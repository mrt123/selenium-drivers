var log = require('./log');
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

function prepareForSelenium({download = true, browserName, deactivate = false, silent = true} = opts) {

  log.infoIf(!silent, 'Preparing driver for browser: ' + browserName);

  var driver = new Driver(browserName, arguments[0]);

  if (!driver.supported.includes(browserName)) {
    throw new Error('Selenium drivers does not support browser: ' + browserName);
  }

  return new Promise(function (resolve, reject) {
    if (deactivate) {
      resolve();
    }
    else if (browserName === 'safari') {
      log.infoIf(!driver.opts.silent, 'NOTICE: requires minimum OSX: ElCaptain & Safari 10.0!');
      resolve();
    }
    else {
      pathPrep.addPathToEnvironment(driver.downloadPath);  // for selenium

      if (download) {
        handleDownload(driver, resolve, reject);
      }
      else {
        log.infoIf(!driver.opts.silent, 'Driver download disabled, version will not be checked.')
        resolve();
      }
    }
  });
}

function handleDownload(driver, callback, error) {

  download.checkLastDriverVersion(driver).then(function (version) {

    driver.setFileNamesFromVersion(version);

    if (driver.isUpToDate(version)) {
      log.infoIf(!driver.opts.silent, 'Local driver is up to date!');
      callback();
    }
    else {
      var downloadSuccess = prepareDownloadedFile.bind(this, driver, callback);
      var downloadRequest = download.downloadDriverToDirectory(driver);
      report.reportProgress(downloadRequest, driver);
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
