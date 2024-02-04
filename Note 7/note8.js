// 8 - Querying Documents

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

// Added
async function getCourses() {
  // return a doc query method like a promise.
  // const courses = await Course.find();
  // filtering
  // const courses = await Course.find({ author: "Jay", isPublished: true });
  // limit filter. sort with multiple key value. -1 for descending.
  const courses = await Course.find({ author: "Jay", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // above only returns only id, name and tags and sorted with name.
  console.log(courses);
}

// createCode();
getCourses();
