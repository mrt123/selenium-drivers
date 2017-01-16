var path = require('path');

module.exports = {
  addPathToEnvironment: addPathToEnvironment
};


function addPathToEnvironment(pathToAdd) {
  process.env.PATH += path.delimiter + pathToAdd;
}
