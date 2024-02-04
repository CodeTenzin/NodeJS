// 13 - HTTP Module

const http = require("node:http");

// server is an event emitter.
// has all its functions.
// bunch of nodes core functions are based on EventEmitter
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  //   localhost:3000/api/courses
  if (req.url === "/api/courses") {
    // returning an array of objects using JSON.
    // converts this array into string using json syntax.
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }

  // Express. A framework to give a clean strucutre to
  // handle various routes.
  // internally Express is built on top of the HTTP module
  // in node
});
// server.on("connection", (socket) => {
//   console.log("New Connection...");
// });
server.listen(3000);

console.log("Listening on port 3000...");
