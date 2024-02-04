// 11 - Input Validation

/*
what if property that the client sends does not exist in our course object.
always valdate the client input

*/

// Added
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
  // npm i joi to simplify data validation.
  // define a scheme, defines the shape of our object and  property and types etc.
  // shape of our course object
  const schema = {
    name: Joi.string(),
  };
  // sudo npm i joi@13.1.0
  const result = Joi.validate(req.body, schema);
  // const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    // res.status(400).send(result.error);
    res.status(400).send(result.error.details[0].message);

    return;
  }

  // // check for the property given by client
  // if (!req.body.name || req.body.name.length < 3) {
  //   // 400 Bad Request
  // res
  //   .status(400)
  //   .send("Name is required and should be minimum 3 characters.");
  // return;
  // }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// POSTMAN
// POST http://localhost:9000/api/courses
// { }  body with empty object.
