// 10 - Events Module

// a signal that indicates that something has happened.
// documentation: Events => Class: EventEmitter

// Capitalized, indicates a class.
const EventEmitter = require("node:events");
// emitter object created.
const emitter = new EventEmitter();
// EG: class = human, object = john.

// a listener is func that is called when
// an event is raised
// emitter.addListener()
// below same as above.
emitter.on("messageLogged", function () {
  console.log("Listener called");
});
// place before emit.

// emit raises an event.
// signalling an event has happened
emitter.emit("messageLogged");
