// 4 - Building Your First Web Server

// Below for index.js in express folder

const express = require("express");
const app = express();
// app.get();
// app.post();
// app.put();
// app.delete();

//  / root of website, callback func called a route handler.
// api refernece in website and check request properties.
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  // get list of courses from db.
  // focus here is no endpoint.
  res.send([1, 2, 3]);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// node index.js
// http://localhost:3000
// http://localhost:3000/api/courses

// calling new routes using get.
// can also move the route to different files.
// Eg: moving all courses route to courses.js
// express gives our app a structure, a skeleton.
