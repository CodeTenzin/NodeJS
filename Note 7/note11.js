// 11 - Regular Expressions

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
  // wont get Jayfep or Jay Han
  // const courses = await Course.find({ author: "Jay", isPublished: true })
  // Starts with Jay: /^Jay/
  // End with Han: /Han$/
  // Case insensitive: /Han$/i
  // Contains the word Jay: /.*Jay.*/   .* in regex means 0 or more charac.
  const courses = await Course.find({ author: /^Jay/ })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
