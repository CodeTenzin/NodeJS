// 9 - Templating Engines

/*
so far enppoints returned a json object
sometimes want a html markup. templating engine.

Eg:
Pug
Mustache
EJS

generates dynamic html and return to client

npm i pug		<— templating engine
Create folder: views
Create file: index.pug

DONT NEED LIBRARIES LIKE PUG FOR HTML. SERVICES FOR BACK END DONT NEED IT.
*/

const config = require("config");
const Joi = require("joi");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

// Add
// view engine property, pug name of engine.
app.set("view engine", "pug"); // express internally loads the module.
app.set("views", "./views"); // default
// Create folder: views
// Create file: index.pug

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

console.log("App Name", config.get("name"));
console.log("Mail Server ", config.get("mail.host"));
console.log("Mail Password ", config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}

dbDebugger("Connected to database...");

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
  // res.send("Hello World");
  // pass name of pug file.
  // pass object that contains all the values for the params defined in the template pug.
  res.render("index", { title: " My Express App", message: "Hello" });
});
// localhost:9000

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
