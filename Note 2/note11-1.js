// 12 - Extending EventEmitter

const EventEmitter = require("node:events");
// const emitter = new EventEmitter(); after extending.

// Register an listener.
// This listener is not called.
// since working with 2 different EventEmitter.
// emitter.on("messageLogged", (arg) => {
//   console.log("Listener called", arg);
// });

// const log = require("./note11-2");
// log("Hello World"); after extending.
const Logger = require("./note11-2");
const logger = new Logger();
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});
console.log("Hello World");
