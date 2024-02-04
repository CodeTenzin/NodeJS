// 5 - Validation Errors
// CODE FIXED HERE

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,

      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have atleast one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
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

// FIXED. for try catch
async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Jay",
    // category: "web",
    category: "-",
    tags: null,
    isPublished: true,
    price: 15,
  });
}

try {
  const result = await course.save();
  console.log(result);
} catch (ex) {
  // Added
  // ex.errors will get all the properties that caused an error: category, tags.
  // so we can iterate over multiple validation objects.
  for (field in ex.errors) {
    // console.log(ex.error[field]);
    console.log(ex.error[field].message);
  }
}

createCourse();
