// 14 - Exercise 1

// run command in same folder as the json file.
// makes a new db.

// Solution 1.js

// Exercies
/*
Get all the published backend courses, 
sort them by their name,
pick only their name and author,
and display them.
*/

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises");

// shaped based off the shape in the mongo db json file.
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

// model
const Course = mongoose.model("Course", courseSchema);

// query
async function getCourses() {
  // const courses = await Course.find({ isPublished: true, tags: "backend" })
  return await Course.find({ isPublished: true, tags: "backend" })
    // .sort("-name")
    // .sort("name")
    .sort({ name: 1 })
    // .select("name author")
    .select({ name: 1, author: 1 });
  // return courses;
}

// when we decorate with async js automatically wraps result in promise.
// hover.
async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
