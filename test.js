var seleniumDrivers = require('./lib/selenium-drivers');

var browserName = 'chrome';

seleniumDrivers.init({

    name: browserName,
    download: true

}).then(function () {

    console.log('Running WebDriver Test ...');
    var webdriver = require('selenium-webdriver'),
        until = webdriver.until;

    var driver = new webdriver.Builder()
        .forBrowser(browserName)
        .build();
    //
    driver.get('http://www.google.com/ncr');
    driver.wait(until.titleIs('Google'), 1000);
    driver.quit().then(function () {
        console.log('Test passed');
    });
    
    // TODO: include mocha and run 1 test per browser.

});