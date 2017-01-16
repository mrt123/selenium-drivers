module.exports = {
  reportProgress: reportProgress
};


function reportProgress(activeFileRequest) {
  const reporter = createReporter();
  const progressLib = require('request-progress');

  return new Promise(function (resolve, reject) {
    progressLib(activeFileRequest)
      .on('progress', function (state) {
        var number = (state['percentage'] * 100).toFixed(2);
        reporter.reportProgress('Received: ' + number + '%');
      })
      .on('error', function (err) {
        console.log(err);
        reject();
      })
      .on('end', function () {
        reporter.reportFinal('Received: 100%');
        resolve();
      });
  });
}

function createReporter() {
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
      rl.write('', {name: 'enter'});
      rl.close();
    }
  }
}
