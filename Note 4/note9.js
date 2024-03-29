// 9 - Handling HTTP POST Requests

const express = require("express");
const app = express();

// Added for enable parsing of JSON objects in body of req.
// added a middleware.
app.use(express.json());

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
  if (!course) res.status(404).send("The course with the given ID not found");
  res.send(course);
});

// creating new course. courses to get the list
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    // assuming in req body has an object with name property.
    // need to enable parsing of JSON objects in body of req.
    // by default not enabled in express. code above.
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
