// 17 - Updating a Document- Query First

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);

// 2 ways to update doc in mongo.
// Approach 1: Query first
// findById()
// Modify its properties
// Save

//Approach 2: Update first
// Update directly
// Optionally: get the updated document
async function updateCourse(id) {
  // Approach 1
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Another Author";
  // course.set({
  //   // key value pairs
  //   isPublished: true,
  //   author: "Another Author",
  // });
  // save creates a new course and returns a promise.
  const result = await course.save();
  console.log(result);
}

// got course id from mongo's compass.
updateCourse("65beeb3225f240a11ae95352");
// From playground courses.
