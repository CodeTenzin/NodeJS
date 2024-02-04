// 7 - Saving a Document

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

// Added
async function createCode() {
  // dealing with async operaiton. file operation.
  // mongo db assigns a unique id to the course object.
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
createCode();
// outout given with unique id.
// _id: new ObjectId('65beeb3225f240a11ae95352'),

// simply create a document and saved in mongodb.

// ENDNOTE: CHECK MONGODB.
