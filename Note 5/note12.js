// 12 - Structuring Express Applications

/*
every logical part of the app for every api end point should
be in a seperate file / module.
eg: all routes for courses should be in courses.js

Create: routes folder
Create: courses.js file
Create: home.js file

Create folder: middleware
Move the logger file into that. note3-2.js
*/

const config = require("config");
const Joi = require("joi");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
// moved logger file into middleware folder.
const logger = require("./middleware/note3-2");
// Added
const courses = require("../express/routes/courses");
const home = require("../express/routes/home");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
// Added. pass path
app.use("/api/courses", courses);
// telling that for any route that start with the path, use this router called courses.
app.use("/", home);

console.log("App Name", config.get("name"));
console.log("Mail Server ", config.get("mail.host"));
console.log("Mail Password ", config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}

// dbDebugger("Connected to database...");

// app.use(function (req, res, next) {
//   console.log("Authenticating...");
//   next();
// });

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
