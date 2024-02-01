const EventEmitter = require("node:events");
// const emitter = new EventEmitter(); after extending.

class Logger extends EventEmitter {
  // function log(message) {
  log(message) {
    console.log(message);
    // Raise an event
    // emitter.emit("messageLogged", { id: 1, url: "https" });
    // by exterding EventEmitter
    this.emit("messageLogged", { id: 1, url: "https://" });
  }
}

// module.exports = Log;
// export class intead of function.
module.exports = Logger;
