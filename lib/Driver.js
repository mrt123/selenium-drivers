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
        this.version = '';
        this.os = Driver._getOS();

        this.downloadPath = path.join(__dirname, '../downloads');

        this.archiveFileName = '';
        this.url = '';        

        this.binaryFileName = this._getBinaryFileName(name);
    }

    setVersion(v) {
        this.version = v;
        var archiveFileName = this._setArchiveFileName(this.name, v);  
        this.url = this._getUrl(this.name, v, archiveFileName);
    }

    extract() {
        return extract.extract(this).then(function (archiveEntry) {
            console.log('Extracted new file: ' + archiveEntry);
        });
    }

    isUpToDate(version) {  // TODO: use version and remove all temporal dependencies!
        var versionedArchiveExists  = fs.existsSync(this.getArchivePath());
        var binaryExists  = fs.existsSync(this.getBinaryPath());
        return versionedArchiveExists && binaryExists;
    }
    
    getArchivePath() {
        return path.join(this.downloadPath, this.archiveFileName);
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

    _setArchiveFileName(driverName, version) {
        if (driverName === 'chrome') {
            this.archiveFileName =  'chromedriver_' + this.os.name + '.zip';
        }
        if (driverName === 'firefox') {
            this.archiveFileName =  'geckodriver-'+ version + '-' + this.os.firefoxAlias + '.tar.gz';
        }
        return this.archiveFileName;
    }

    _getUrl(name, version, archiveFileName) {
        if (name === 'chrome') {
            var urlBase = 'https://chromedriver.storage.googleapis.com/';
            return urlBase + version + '/' + archiveFileName;
        }
        if (name === 'firefox') {
            var baseUrl = 'https://github.com/mozilla/geckodriver/releases/download/';
            return baseUrl + version + '/' + archiveFileName;
        }
    }
};



