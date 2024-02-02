// 5 - Third-party Middleware
// expressjs.com -> resources drop down -> middleware

// every middleware funciton will impact the performance of your app.

// helmet middleware.
// Helps secure your apps by setting various HTTP headers.

const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require("../Note 5/note3-2");
// Added
const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// added
app.use(helmet());
// use tiny format. check documentation.
app.use(morgan("tiny"));
// everytime we send a req to server, it will be logged.
// POSTMAN: GET http://localhost:9000/api/courses
// check console.
// can also configure to log to log file.
//this middleware will impact the performance. remove it
// during production or only in certain situation.

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
