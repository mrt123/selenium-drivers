# selenium-drivers

Node.js binding for selenium browser drivers.
Sets up your system environment and keeps drivers up to date for various
browsers and operating systems.

* Currently works only with WebDriverJs
* Suitable for running locally or with CI
* supported NodeJs: 6.x or above
* by default uses newest drivers (make sure your browser is also up to date)

Make sure your OS & Browser are [supported!](#Supported-Browsers)

## Use case:
```javascript
var webDriver = require('selenium-webdriver');
var seleniumDrivers = require('selenium-drivers');

seleniumDrivers.init({

    browserName: 'chrome',
    download: true

}).then(function () {

    var driver = new webDriver.Builder()
        .forBrowser('chrome')
        .build();

    driver.get('http://www.google.com/ncr');
});
```
## Options
* `browserName`: ('chrome' | 'firefox' | 'internet explorer' | 'safari') specify browser name
* `silent`: (true | false) set to false for verbose output (default: `true`)
* `download`: (true | false) disable driver download (default: `true`)
* `deactivate`: (true | false) deactivate library (useful when running with custom browser capabilities where driver is provided,
eg: for sauceLabs, or browserStack) (default: `false`)

## Supported Browsers
| Browser           | Operating Systems           | 
| ----------------- |:---------------------------:|
| Chrome            | macOS_64, Windows7,8,10     | 
| Firefox           | macOS_64, Windows7,8,10     |   
| Internet Explorer |     Windows7,8,10           |    
| Safari            |    macOS >= ElCaptain       |

* Nodejs >= 6.x required on all OS.
* No guarantee to run on outdated browsers.

## RoadMap
* linux support
* option to set custom browser driver version
* option to set custom browser driver archive url
* custom url pattern
* Edge, Opera, PhantomJS support
* programmatic start/stop feature (for non WebDriverJs usage)
