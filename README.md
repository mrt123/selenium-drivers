# selenium-drivers

Node.js binding for selenium browser drivers.
Sets up your system environment and keeps drivers up to date for various
browsers and operating systems.

* Currently works only with WebDriverJs
* Suitable for running locally or with CI
* supported browsers: Firefox, Chrome, Safari (more to follow)
* supported OS: Windows, OSX, Linux
* supported NodeJs: 6.x or above

## Use case:
```javascript
var browserName = 'chrome';

seleniumDrivers.init({

    name: browserName,
    download: true

}).then(function () {

    var driver = new webDriver.Builder()
        .forBrowser(browserName)
        .build();

    driver.get('http://www.google.com/ncr');
});
```
## Options
* `name`: ('chrome' | 'firefox' | 'safari') specify browser name
* `download`: (true | false) disable driver download (default: `true`)
* `deactivate`: (true | false) deactivate library (useful when running with custom browser capabilities where driver is provided,
eg: for sauceLabs, or browserStack) (default: `false`)

## Roadmap
* option to set fixed browser driver version
* auto check for newest available driver
* don't download new driver if local driver is up to date
* option to set fixed browser driver archive url
* custom url pattern
* Edge, Opera, PhantomJS support
* programmatic start/stop feature (for non WebDriverJs usage).
