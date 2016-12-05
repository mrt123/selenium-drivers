module.exports = {
    addToPath : exportPath
};



function exportPath(pathToExport) {
    process.env.PATH += path.delimiter + pathToExport;
}
