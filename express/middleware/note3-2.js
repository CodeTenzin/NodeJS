// put each middleware function in a seperate file or module.

// File name: Logger.js
// added. next reference to the next middleware

function log(req, res, next) {
  console.log("Logging...");
  next();
}

module.exports = log;
