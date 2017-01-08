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
        supported: false
    },
    'mac64': {
        name: 'mac64',
        supported: true
    },
    'win32': {
        name: 'win32',
        supported: true
    }
};

module.exports = class Driver {

    constructor(name, version) {
        this.version = version;
        this.os = Driver._getOS();

        this.downloadPath = path.join(__dirname, '../downloads');
        
        this.archiveFileName = this._getArchiveFileName(name);
        this.url = this._getUrl();          // TODO: remove temporal dependency.
        
        this.binaryFileName = '';
    }
    
    extract() {
        this.binaryFileName = extract.extract(this);
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

    _getArchiveFileName(driverName) {
        if(driverName === 'chrome') {
            return 'chromedriver_' + this.os.name + '.zip';
        }
    }

    _getUrl() {
        return 'https://chromedriver.storage.googleapis.com/2.25/' + this.archiveFileName;
    }
};



