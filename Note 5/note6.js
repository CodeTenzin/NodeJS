// 6 - Environments

// want to enable or disable certain features based on the current env.
// dev or production.

const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require("../Note 5/note3-2");

const helmet = require("helmet");
const morgan = require("morgan");

// Added
// NODE_ENV returns env for this node app.
// if its not set, it will be undefined.
// process is global object in node that gives
// access to the current process.
console.log(`NODE ENV: ${process.env.NODE_ENV}`); //returns "undefined"
// interanally uses process.env.NODE_ENV but
// if NODE_ENV is not set, it returns developmen by default
console.log(`APP: ${app.get("env")}`); //returns "development"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
// eg only want this in dev.
// app.use(morgan("tiny"));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan enabled...");
}
// to set env to production
// export NODE_ENV=production

app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

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
  if (!course)
    return res.status(404).send("The course with the given ID not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with the given ID not found");
  }
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  courses.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
