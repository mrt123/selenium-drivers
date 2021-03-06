var seleniumDrivers = require('../lib/selenium-drivers');
var webDriver = require('selenium-webdriver');
var del = require('del');

describe.skip('WebDriver is able to download new drivers & run browser!', function () {

  before('Deleting all local drivers.', function () {
    return del(['downloads/*', '!downloads/.tmp']);
  });

  it('firefox', function () {
    return assertWebdriverRunsWithBrowser('firefox');
  });

  it('chrome', function () {
    return assertWebdriverRunsWithBrowser('chrome');
  });

  it.skip('safari', function () {
    return assertWebdriverRunsWithBrowser('safari');
  });

  it.skip('internet explorer', function () {
    return assertWebdriverRunsWithBrowser('internet explorer');
  });


  function assertWebdriverRunsWithBrowser(browserName) {
    var actualOutcome;

    return seleniumDrivers.init({
      browserName: browserName,
      silent: true
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