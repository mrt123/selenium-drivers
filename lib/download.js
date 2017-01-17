var fs = require('fs');
var log = require('./log');
var path = require('path');
var request = require('request');

module.exports = {
  downloadDriverToDirectory: downloadDriverToDirectory,
  checkLastDriverVersion: checkLastDriverVersion,
};

function downloadDriverToDirectory(driver) {

  log.infoIf(!driver.opts.silent, 'Downloading : ' + driver.url);
  log.infoIf(!driver.opts.silent, 'Download target : ' + driver.archivePath);

  var activeDownloadRequest = request(driver.url);

  activeDownloadRequest
    .pipe(fs.createWriteStream(driver.archivePath));

  return activeDownloadRequest;
}

function checkLastDriverVersion(driver) {
  if (driver.name === 'chrome') {
    return _checkLastChromeDriverVersion();
  }
  else if (driver.name === 'firefox') {
    return _checkLastFirefoxDriverVersion();
  }
  else if (driver.name === 'internet explorer') {
    return _checkLastIEVersion();
  }
  else {
    throw new Error('unknown driver type!');
  }
}

function _checkLastChromeDriverVersion() {
  var url = 'http://chromedriver.storage.googleapis.com/LATEST_RELEASE';

  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var version = body.replace('\n', '');
        resolve(version);
      }
      else {
        reject();
      }
    });
  });
}

function _checkLastIEVersion() {
  var url = 'http://selenium-release.storage.googleapis.com/?delimiter=/&prefix=';

  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //  TODO: parse DOM body and get version
        resolve('3.0');
      }
      else {
        reject();
      }
    });
  });
}

function _checkLastFirefoxDriverVersion() {
  var url = 'https://github.com/mozilla/geckodriver/releases/latest';
  return new Promise(function (resolve, reject) {
    request({json: true, url: url}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body.tag_name);
      }
      else {
        reject();
      }
    });
  });
}
