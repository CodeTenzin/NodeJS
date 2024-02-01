// 11 - Event Arguments

const EventEmitter = require("node:events");
const emitter = new EventEmitter();

// 2)
// Reister a listener.
emitter.on("messageLogged", function (arg) {
  console.log("Listener called", arg);
  // Listener called { id: 1, url: 'https' }
});

// emitter.on("messageLogged", (arg) => {
//   console.log("Listener called", arg);
// });

// 1)
// Raise an event.
// sending arguments. or event arguments.
// emitter.emit("messageLogged", 1, "url");
emitter.emit("messageLogged", { id: 1, url: "https" });
