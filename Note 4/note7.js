// 7 - Route Parameters

/*

route to get a single course.
/api.courses/1

*/

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// Added
// localhost:3000/api/courses/1
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

// localhost:3000/api/posts/2050/12
// app.get("/api/posts/:year/:month", (req, res) => {
//   // res.send(req.params.year);
//   res.send(req.params);
//   // { year: 2050, month: 12 }
// });
// Query string params. params we add after ?
// localhost:3000/api/posts/2050/12?sortBy=name
// used to provide additional data to back.
// Route ramas for required or essential values
// Query string params for optional.

// Reading query string params.
app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params);
  res.send(req.query);
  // localhost:3000/api/posts/2050/12?sortBy=name
  // {"sortBy":"name"}
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
ç;
