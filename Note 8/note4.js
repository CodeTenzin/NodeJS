// 4 - Async Validators

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
      // sometime validaiton logic may involve reading from db or remote http service.
      // so we dont have an asnwer straight away.
      // convert sync validator to async.
      isAsync: true,
      // use a callback to deal with async.
      // do some async work and when the result is ready use the call back.
      // timeout to simulate asyn
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

const course = new Course({
  name: "Angular Course",
  author: "Jay",
  category: "web",
  //   tags: ["angular", "frontend"],
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
