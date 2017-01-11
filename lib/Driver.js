var path = require('path');
var extract = require('./extract');

const OPERATING_SYSTEMS = {
    'linux32': {
        name: 'linux32',
        supported: true
    },
    'linux64': {
        name: 'linux64',
        supported: true
    },
    'mac32': {
        name: 'mac32',
        firefoxAlias: 'macos',
        supported: false
    },
    'mac64': {
        name: 'mac64',
        firefoxAlias: 'macos',
        supported: true
    },
    'win32': {
        name: 'win32',
        supported: true
    }
};

module.exports = class Driver {

    constructor(name) {
        this.name = name;
        this.version = '';
        this.os = Driver._getOS();

        this.downloadPath = path.join(__dirname, '../downloads');

        this.archiveFileName = this._getArchiveFileName(name);
        this.url = '';          // TODO: remove temporal dependency.

        this.binaryFileName = this._getBinaryFileName(name);
    }

    setVersion(v) {
        this.version = v;
        this.url = this._getUrl(this.name, v);
    }

    extract() {
        return extract.extract(this).then(function (archiveEntry) {
            console.log('Extracted new file: ' + archiveEntry);
        });
    }

    getArchivePath() {
        return path.join(this.downloadPath, this.archiveFileName);
    }

    isUpToDate() {
        // TODO:


    }

    isBinaryPresent() {
        var fs = require('fs');
        return fs.existsSync(path.join(this.downloadPath, this.binaryFileName));
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
            return OPERATING_SYSTEMS.win32;
        }
        else {
            return null
        }
    }

    _getBinaryFileName(driverName) {
        if (driverName === 'chrome') {
            return 'chromedriver';
        }
        else if (driverName === 'firefox') {
            return 'geckodriver';
        }
    }

    _getArchiveFileName(driverName) {
        if (driverName === 'chrome') {
            return 'chromedriver_' + this.os.name + '.zip';
        }
        if (driverName === 'firefox') {
            return 'geckodriver-v0.13.0-' + this.os.firefoxAlias + '.tar.gz';
        }
    }

    _getUrl(name, version) {
        if (name === 'chrome') {
            var urlBase = 'https://chromedriver.storage.googleapis.com/';
            return urlBase + version + '/' + this.archiveFileName;
        }
        if (name === 'firefox') {
            var baseUrl = 'https://github.com/mozilla/geckodriver/releases/download/';
            return baseUrl + version + '/' + this.archiveFileName;
        }
    }
};



