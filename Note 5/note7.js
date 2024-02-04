// 7 - Configuration

/*
storing config settings and also overwriting config for each environment.
npm rc
npm i config  <-- alternative
Create folder: config
Creates configuration files below.
Create file in it: default.json  <-- to define defaukt config settings.
Create file in it: development.json   <-- to overwrite the defaults and also add new properties.
Create file in it: production.json

Create file in it: custom-environment-variables.json  <-- in this files, we define the mapping of config settings to env variables.
*/

// added
const config = require("config");

const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require("../Note 5/note3-2");

const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Configuration
console.log("App Name", config.get("name"));
console.log("Mail Server ", config.get("mail.host"));
// depending on the environment, will see different output.
// Do not store info like password to the repo or mail server.
// Store them in environment variables.

// Storing password in an environment variable.
// export password=1234
// export appname_password=1234   <-- to prevent the clash of env var with same name.
// read them using config files.
console.log("Mail Password ", config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan enabled...");
}

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
