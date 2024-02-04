// 4 - Embedding Documents
// Delete playground db in compass.

// embedding.js

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
    // Embeddig author property directly
    // author: authorSchema,
    // to set up validation for the sub object
    author: {
      type: authorSchema,
      required: true,
    },
  })
);
// node file.js
// author: { name: 'Jay', _id: new ObjectId('65bf5f10d17287066876644a') },
// author is an object with 2 properties.
// embedded or sub document. they cannot be saved on their own.
// can only be done through the context of its parent.

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //   const course = await Course.findById(courseId);
  // can also update sub object directly.
  const course = await Course.updateOne(
    { _id: courseId },
    // and saving in memory and updating directly in db.
    { $set: { "author.name": "John Smith" } }
    // to remove the sub object
    // { $unset: { author: "" } }
  );
  //   course.author.name = "Jay Jay";
  //   course.save();

  // course.author.save() does not exist.
}

// createCourse("Node Course", new Author({ name: "Jay" }));
updateAuthor("65bf5f10d17287066876644b");
