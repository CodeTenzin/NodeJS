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
    // more schema properties.
    lowerCase: true, // mongoose turns it to lower case.
    // uppercase: true,
    trim: true,
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
    // rounding number. custom getter and setter
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Jay",
    // category: "-",
    category: "Web",
    // tags: null,
    tags: ["frontend"],
    isPublished: true,
    // price: 15,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
    // for (field in ex.errors) {
    //   console.log(ex.error[field].message);
    // }
  }
}

createCourse();
