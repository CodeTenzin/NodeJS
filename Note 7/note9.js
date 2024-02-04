// 9 - Comparison Query Operators

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
  // since mongoose built on top of mongo, all features from mogo available.
  // comparision operators:
  // eq, ne, gt, gte, lt, lte, in, nin (not in)
  // const courses = await Course.find({ author: "Jay", isPublished: true })
  // in js, we know an object is a collection of key value pairs.
  // operator as a key and 10 as a value. placed a concept of price >= 10. {gt: 10}
  // $gte: 10, lte: 20  price >= 10 and <=20
  // const courses = await Course.find({ price: { $gte10, lte: 20 } })
  // price == 10 or 15 or 20.
  const courses = await Course.find({ price: { $in: [10, 15, 20] } })

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
