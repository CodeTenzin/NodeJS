// 6 - Models

// compiling schema into a model.
// eg: class and object => course aand nodeCourse

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

// Added.
// Eg: in mongo we have a collection called courses.
// pass the singular name the model is for and schema.
const Course = mongoose.model("course", courseSchema);
// mapping object in the mongodb.
const course = new Course({
  name: "Node.js Course",
  author: "Jay",
  // relational db dont have something like arrays. only simple attributes.
  // needed 3 tables. in mongo or nosql theres no need to define multiple tables.
  tags: ["node", "backend"],
  // date property was set with default.
  isPublished: true,
});
