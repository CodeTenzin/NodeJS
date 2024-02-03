// 6 - Environment Variables

// code below for index.js in express folder.

/*
hardocoded port number. in real world app, port is dynamically
assigned by the hosting environment.
Environment variable called PORT.
a variable that is part of the enviroment in which is outside the app.
*/

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// PORT
// global object called process.
const port = process.env.PORT || 3000;
// app.listen(3000, () => {
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Setting the env var
// export PORT=5000  <-- mac
// set PORT=5000     <-- windows
