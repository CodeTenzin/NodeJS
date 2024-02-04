// 5 - Using an Array of Sub-documents

// delete courses in db.

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // author: authorSchema,
    // changing to an array of sub documents
    authors: [authorSchema],
  })
);

// author -> authors
async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// to add author later
async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author); // changes on my memory
  course.save(); // saved in db too now.
}

// to remove
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId); // lookup child object by id
  author.deleteOne();
  course.save();
}

// createCourse("Node Course", new Author({ name: "Jay" }));
// createCourse("Node Course", [
//   new Author({ name: "Jay" }),
//   new Author({ name: "Yung" }),
// ]);

// node file.js
/*
{
  name: 'Node Course',
  authors: [
    { name: 'Jay', _id: new ObjectId('65bf635071ddb8eb2e5cb13c') },
    { name: 'Yung', _id: new ObjectId('65bf635071ddb8eb2e5cb13d') }
  ],
  _id: new ObjectId('65bf635071ddb8eb2e5cb13e'),
  __v: 0
}
*/

// copy course id from compass
// addAuthor("65bf635071ddb8eb2e5cb13e", new Author({ name: "Amanda" }));

// 2nd arg id of "Amanda"
removeAuthor("65bf635071ddb8eb2e5cb13e", "65bf6425b9217eec1b4c3e8f");
