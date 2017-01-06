var path = require('path');

module.exports = {
    addBinPathToEnvironment : addBinPathToEnvironment
};


function addBinPathToEnvironment() {
    process.env.PATH += path.delimiter + path.join(__dirname, '../downloads');
}
