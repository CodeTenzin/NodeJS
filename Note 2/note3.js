// 4 - Creating a module.
// EG: this file name logger.js

var url = "http://mylogger.io/log";

function log(message) {
  // EG: Send an HTTP request
  console.log(message);
}

// adding a method called log to export object
// and setting it to the log function.
module.exports.log = log;

// module.exports.newName = url;

// module.exports = log;
// now no longer returns an object when
// imported. its just a function.
