var seleniumDrivers = require('./lib/selenium-drivers');
var webDriver = require('selenium-webdriver'),
    until = webDriver.until;

var browserName = 'internet explorer';

seleniumDrivers.init({

    browserName: browserName,
    download: true,
    deactivate: false

}).then(function () {

    console.log('Running WebDriver Test ...');

    var driver = new webDriver.Builder()
        .forBrowser(browserName)
        .build();
    
    driver.get('http://www.google.com/ncr');
    driver.wait(until.titleIs('Google'), 1000);
    driver.quit().then(function () {
        console.log('Test passed');
    });
    
    // TODO: include mocha and run 1 test per browser.
});