// 8 - Handling HTTP GET Requests

/*
implementing end point to get a single course from the server

*/

const express = require("express");
const { toInteger } = require("lodash");
const app = express();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //return 404. object not found
  if (!course) res.status(404).send("The course with the given ID not found");
  // chrome dev tools -> network -> refresh.
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
