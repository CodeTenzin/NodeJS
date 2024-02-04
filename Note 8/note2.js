// 2 - Built-in Validators

const { max } = require("lodash");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Built-in Validators in mongoose.
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    // when creating a course, category should be one of these or get validation error.
    enum: ["web", "mobile", "network"],
    // simulate error: category: "-"
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  //  price only req if its published
  price: {
    type: Number,
    // cannot use arrow function. arrow func does have their own this.
    // this value of the enclosing execution context is used in arrow,
    // not the course object.
    // simulate error commenting price: 15
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const result = await course.save();
  console.log(result);
}

const course = new Course({
  name: "Angular Course",
  author: "Jay",
  tags: ["angular", "frontend"],
  isPublished: true,
  price: 15,
});

const result = await course.save();
console.log(result);
try {
  const result = await course.save();
  console.log(result);
} catch (ex) {
  console.log(ex.message);
}

createCourse();
