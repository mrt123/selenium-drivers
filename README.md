# selenium-drivers

Node.js binding for selenium browser drivers.
Sets up your system environment and keeps drivers up to date for various
browsers and operating systems.

* Currently works only with WebDriverJs
* Suitable for running locally or with CI
* supported browsers: Firefox, Chrome, Safari (more to follow)
* supported OS: Windows, OSX, Linux
* supported NodeJs: 6.x or above
* by default uses newest drivers (make sure your browser is also up to date)

## Use case:
```javascript
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
* `browserName`: ('chrome' | 'firefox' | 'safari') specify browser name
* `download`: (true | false) disable driver download (default: `true`)
* `deactivate`: (true | false) deactivate library (useful when running with custom browser capabilities where driver is provided,
eg: for sauceLabs, or browserStack) (default: `false`)

## Roadmap
* option to set fixed browser driver version
* don't download new driver if local driver is up to date
* option to set fixed browser driver archive url
* custom url pattern
* Edge, Opera, PhantomJS support
* programmatic start/stop feature (for non WebDriverJs usage).
