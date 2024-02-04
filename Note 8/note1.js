// 1 - Validation

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  // by default all the properties defined are optional
  //   name: String,
  //   author: String,
  //   tags: [String],
  //   date: { type: Date, default: Date.now },
  //   isPublished: Boolean,
  //   price: Number,
  // Required validaiton.
  name: { type: String, reqiured: true }, // returns exception if no- name: "Angular Course",
  // UnhandledPromiseRejection - need try catch block.
  // only meaningful in mongoose, not in mongodb.
  // mongoDB doesnt have required mark features such as SQL.
  // Joi and Mongoose api validaion. Use of joi in restfuk api to make sure
  // the data the client tis ending is valid. mongoose validaiton to make sure
  // the data being saved is in the right shape, as its possible to send a valid course
  // in the body of the req, but when we create a course object in our http service we may forget
  // to set the name property to what we get from req.body.name.
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
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

// Add try catch
try {
  // validation automatically kicks in when we try to save.
  // const result = await course.save();
  //   console.log(result);
  //   await course.validate();  alternative. returns a promise or void, not boolean.
  // mongoose design blaw. to get a boolean result need to use a callback.
  //   course.validate((err) => {
  //     if (err) {
  //     }
  //   });
  const result = await course.save();
  console.log(result);
} catch (ex) {
  console.log(ex.message);
}

createCourse();
