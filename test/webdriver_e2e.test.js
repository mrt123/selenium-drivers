var seleniumDrivers = require('../lib/selenium-drivers');
var webDriver = require('selenium-webdriver');
var del = require('del');

describe('webDriver is able to run browser!', function () {

  before(function () {
    return del(['downloads/*', '!downloads/.tmp']);
  });

  it('firefox', function () {
    return assertWebdriverRunsWithBrowser('firefox');
  });

  it('chrome', function () {
    return assertWebdriverRunsWithBrowser('chrome');
  });
  
  
  function assertWebdriverRunsWithBrowser(browserName) {
    var actualOutcome;

    return seleniumDrivers.init({
      browserName: browserName
    }).then(function () {

      try {
        new webDriver.Builder().forBrowser(browserName).build().quit();
        actualOutcome = 'webDriver did not throw';
      }
      catch (e) {
        actualOutcome = 'webDriver threw error!';
      }
      finally {
        expect(actualOutcome).to.equal('webDriver did not throw');
      }
    });
  }
  
  
});