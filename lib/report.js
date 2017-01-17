module.exports = {
  reportProgress: reportProgress
};


function reportProgress(activeFileRequest, driver) {
  const reporter = createReporter(driver.opts.silent);
  const progressLib = require('request-progress');

  return new Promise(function (resolve, reject) {
    progressLib(activeFileRequest)
      .on('progress', function (state) {
        var number = (state['percentage'] * 100).toFixed(2);
        reporter.reportProgress(' downloading new '+ driver.name +' driver > ' + number + '%');
      })
      .on('error', function (err) {
        console.log(err);
        reject();
      })
      .on('end', function () {
        reporter.reportFinal(' downloading new '+ driver.name +' driver >  100%');
        resolve();
      });
  });
}

function createReporter(isSilent) {
  const readLine = require('readline');
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return {
    reportProgress: function reportProgress(progressString) {
      rl.write('', {ctrl: true, name: 'u'});   // Simulate Ctrl+u to delete the line written previously
      rl.write(progressString);
    },
    reportFinal: function (progressString) {
      this.reportProgress(progressString);
      
      if(isSilent) {
        process.stdout.clearLine();
        process.stdout.write("\r");
      }
      else {
        rl.write('', {name: 'enter'});
      }
      rl.close();
    }
  }
}
