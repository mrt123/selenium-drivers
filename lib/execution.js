module.exports = {
    run : run
};



function run(pathToBinary) {
    exportPath(pathToBinary);
    console.log('running browser driver...');
    exports.defaultInstance = require('child_process').execFile(fileReference);
}
