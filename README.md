# selenium-drivers

Nodejs binding for selenium browser drivers. Automates browser driver setup for various operating systems and browsers. 
Suitable for running locally or with CI.

* Currently works only with WebDriverJs
* more general programing interface will be introduced later
* supported browsers: Firefox, Chrome  (more to follow)
* supported OS: Windows, OSX, Linux


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
```
## Options
* name : specify browser name 
* download: disable driver download (enabled by default)
* deactivate: deactivate library (useful when running with custom browser capabilities where driver is provided, 
eg: for sauceLabs, or browserStack ).

TODO:
Options:
* fixed browser driver version
* auto check for newest available driver
* don't download new driver if local driver is up to date
* fixed browser driver archive url
* custom url pattern
* Edge, Opera, PhantomJs support
