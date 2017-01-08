var seleniumDrivers = require('./lib/selenium-drivers');

seleniumDrivers.init({
    
        name: 'chrome',
        download: false
    
    }).then(function () {

        var webdriver = require('selenium-webdriver'),
            until = webdriver.until;

        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        driver.get('http://www.google.com/ncr');
        driver.wait(until.titleIs('Google'), 1000);
        driver.quit().then(function () {
            console.log('Test passed');
        });

    });