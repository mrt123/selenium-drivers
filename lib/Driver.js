var path = require('path');
var extract = require('./extract');
var fs = require('fs');

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
        return extract.extract(this).then(function (archiveEntry) {
            console.log('Extracted new file: ' + archiveEntry);
        });
    }

    isUpToDate() {
        var versionedArchiveExists  = fs.existsSync(this.archivePath);
        var binaryExists  = fs.existsSync(this.getBinaryPath());
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

    _getArchiveFileName(driverName, version) {
        if (driverName === 'chrome') {
            return 'chromedriver_' + this.os.name + '.zip';
        }
        if (driverName === 'firefox') {
            return 'geckodriver-'+ version + '-' + this.os.firefoxAlias + '.tar.gz';
        }
    }

    _getUrl(version, archiveFileName) {
        if (this.name === 'chrome') {
            var urlBase = 'https://chromedriver.storage.googleapis.com/';
            return urlBase + version + '/' + archiveFileName;
        }
        if (this.name === 'firefox') {
            var baseUrl = 'https://github.com/mozilla/geckodriver/releases/download/';
            return baseUrl + version + '/' + archiveFileName;
        }
    }
};



