// 12 - Handling HTTP PUT Requests

const Joi = require("joi");
const express = require("express");
const app = express();

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

app.post("/api/courses", (req, res) => {
  // const schema = {
  //   name: Joi.string(),
  // };
  // const result = Joi.validate(req.body, schema);
  // console.log(result);

  const { error } = validateCourse(req.body);

  // if (result.error) {
  if (error) {
    // res.status(400).send(result.error.details[0].message);
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Update resouces
app.put("/api/courses/:id", (req, res) => {
  // Part 1
  // Look up course
  // if not existing, return 404, resource not found.

  // Part 2
  // Validate
  // If invalid, return 400 - Bad request

  // Part 3
  // Update course
  // Return the updated course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with the given ID not found");

  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  // if (result.error) {
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  courses.name = req.body.name;
  res.send(course);
});

// Added. code duplication.
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  // const result = Joi.validate(req.body, schema);
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// POSTMAN
// PUT http://localhost:9000/api/courses/1
// BODY  {"name:" "new course"}

// new postman tab
// GET http://localhost:9000/api/courses
