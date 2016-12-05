module.exports = {
    fix : fix
};



function fix(driver) {

    if (driver.os.name != 'win32') {
        console.log('Fixing file permissions');
        fs.chmodSync('./' + driver.targetFileName, '755')
    }
}
