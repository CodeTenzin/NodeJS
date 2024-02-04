// 12 - Counting

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
  const courses = await Course.find({ author: "Jay", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    // filtering and picking only name and tag.
    // .select({ name: 1, tags: 1 });
    // only want the cout of docs that match the find cirteria
    .count(); // 2

  console.log(courses);
}

getCourses();
