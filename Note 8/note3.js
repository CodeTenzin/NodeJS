// 3 - Custom Validators

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
  // sometimes built in validators i mongoose dont give the kind of validator we need.
  // eg: what if we want to enforce that every course have atleast one tag.
  // tags: [String],
  // replaced with object
  tags: {
    type: Array,
    validate: {
      // v for value and return custom validator
      validator: function (v) {
        return v && v.length > 0;
      },
      // can also set custom message.
      message: "A course should have atleast one tag.",
    },
    // simulate error: category: "web", tag: [] or excluded tag property.
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

const course = new Course({
  name: "Angular Course",
  author: "Jay",
  tags: ["angular", "frontend"],
  isPublished: true,
  price: 15,
});

// const result = await course.save();
// console.log(result);
try {
  const result = await course.save();
  console.log(result);
} catch (ex) {
  console.log(ex.message);
}

createCourse();
