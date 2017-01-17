var path = require('path');
var extract = require('./extract');
var fs = require('fs');

const OPERATING_SYSTEMS = {
  'linux32': {
    name: 'linux32',
    chromeAlias: 'linux32',
    supported: true
  },
  'linux64': {
    name: 'linux64',
    chromeAlias: 'linux64',
    supported: true
  },
  'mac32': {
    name: 'mac32',
    firefoxAlias: 'macos',
    chromeAlias: 'mac32',
    supported: false
  },
  'mac64': {
    name: 'mac64',
    firefoxAlias: 'macos',
    chromeAlias: 'mac64',
    supported: true
  },
  'win32': {
    name: 'win32',
    alias: 'Win32',
    firefoxAlias: 'win32',
    chromeAlias: 'win32',
    supported: true
  },
  'win64': {
    name: 'win64',
    alias: 'Win64',
    firefoxAlias: 'win64',
    chromeAlias: 'win32',
    supported: true
  }
};

module.exports = class Driver {

  constructor(name, opts) {
    this.name = name;
    this.opts = opts;
    this.supported = ['safari', 'chrome', 'internet explorer', 'firefox'];
    this.os = Driver._getOS();
    this.downloadPath = path.join(__dirname, '../downloads');
    this.binaryFileName = this._getBinaryFileName(name);

    this.version = undefined;
    this.url = undefined;
    this.archiveFileName = undefined;
    this.archivePath = undefined;
  }

  setFileNamesFromVersion(version) {
    this.version = version;
    this.archiveFileName = this._getArchiveFileName(this.name, version);
    this.url = this._getUrl(version, this.archiveFileName);
    this.archivePath = this.getArchivePath(this.archiveFileName);
  }

  extract() {
    return extract.extract(this);
  }

  isUpToDate() {
    var versionedArchiveExists = fs.existsSync(this.archivePath);
    var binaryExists = fs.existsSync(this.getBinaryPath());
    return versionedArchiveExists && binaryExists;
  }

  getArchivePath(archiveFileName) {
    return path.join(this.downloadPath, archiveFileName);
  }

  getBinaryPath() {
    return path.join(this.downloadPath, this.binaryFileName)
  }

  static _getOS() {
    if (process.platform === 'linux') {
      if (process.arch === 'x64') {
        return OPERATING_SYSTEMS.linux64;
      }
      else {
        return OPERATING_SYSTEMS.linux32;
      }
    }
    else if (process.platform === 'darwin') {
      if (process.arch === 'x64') {
        return OPERATING_SYSTEMS.mac64;
      }
      else {
        return OPERATING_SYSTEMS.mac32;
      }
    }
    else if (process.platform === 'win32') {

      function isOSWin64() {
        return process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
      }

      if (isOSWin64()) {
        return OPERATING_SYSTEMS.win64;
      }
      else {
        return OPERATING_SYSTEMS.win32;
      }
    }
    else {
      throw new Error('Operating system was not recognized!');
    }
  }


  // TODO: export below to sub-classes!

  _getBinaryFileName(driverName) {
    var fileExtension = '';
    if (process.platform === 'win32') {      // TODO : export OS to a Class with isWindows() method
      fileExtension = '.exe';
    }

    if (driverName === 'chrome') {
      return 'chromedriver' + fileExtension;
    }
    else if (driverName === 'firefox') {
      return 'geckodriver' + fileExtension;
    }
    else if (driverName === 'internet explorer') {
      return 'IEDriverServer' + fileExtension;
    }
  }

  _getArchiveFileName(driverName, version) {
    if (driverName === 'chrome') {
      return 'chromedriver_' + this.os.chromeAlias + '.zip';
    }
    if (driverName === 'firefox') {
      if (this.os === OPERATING_SYSTEMS.win32 || this.os === OPERATING_SYSTEMS.win64) {
        return 'geckodriver-' + version + '-' + this.os.firefoxAlias + '.zip';
      }
      else {
        return 'geckodriver-' + version + '-' + this.os.firefoxAlias + '.tar.gz';
      }
    }
    if (driverName === 'internet explorer') {
      if (this.os === OPERATING_SYSTEMS.win32) {
        return 'IEDriverServer_' + this.os.alias + '_' + version + '.0.zip';
      }
      else if (this.os === OPERATING_SYSTEMS.win64) {
        return 'IEDriverServer_x64_' + version + '.0.zip';
      }
    }
  }

  _getUrl(version, archiveFileName) {
    if (this.name === 'chrome') {
      var urlBase = 'https://chromedriver.storage.googleapis.com/';
      return urlBase + version + '/' + archiveFileName;
    }
    else if (this.name === 'firefox') {
      var baseUrl = 'https://github.com/mozilla/geckodriver/releases/download/';
      return baseUrl + version + '/' + archiveFileName;
    }

    //http://selenium-release.storage.googleapis.com/3.0/IEDriverServer_Win32_3.0.0.zip
    else if (this.name === 'internet explorer') {
      var baseUrl = 'http://selenium-release.storage.googleapis.com/';
      return baseUrl + version + '/' + archiveFileName;
    }
  }
};



