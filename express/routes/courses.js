const express = require("express");
// const app = express();
// does not work when seperating routes.
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// below replaced app with router
// app.get("/api/courses", (req, res) => {
// below removed /api/courses since it was set in index.
// router.get("/api/courses", (req, res) => {
router.get("/", (req, res) => {
  res.send(courses);
});

// router.get("/api/courses/:id", (req, res) => {
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID not found");
  res.send(course);
});

// app.post("/api/courses", (req, res) => {
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// app.put("/api/courses/:id", (req, res) => {
router.put("/:id", (req, res) => {
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

// app.delete("/api/courses/:id", (req, res) => {
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

// Added
module.exports = router;
