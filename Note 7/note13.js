// 13 - Pagination

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

async function createCode() {
  const result = await course.save();
  console.log(result);
}

const course = new Course({
  name: "Angular Course",
  author: "Jay",
  tags: ["angular", "frontend"],
  isPublished: true,
});

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  // Real life use: api/course?pageNumber=2&pageSize=10

  const courses = await Course.find({ author: "Jay", isPublished: true })
    // used to implement pagination.
    // skipping all doc in previous page.
    // Assuming page number starts from 1.
    .skip((pageNumber - 1) * pageSize)
    // .limit(10)
    .limit(pageSize) // can now get doc in a given page.
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
