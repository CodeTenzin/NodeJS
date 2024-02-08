// 3 - Introducing Express

// Create folder Express
// npm init --yes   for package.json
// npm i express

const http = require("node:http");

const server = http.createServer((req, res) => {
  // need more more if blocks for more path.
  // framwork gives proper structure while keeping code miantianable.
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000...");
