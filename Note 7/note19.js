// 19 - Removing Documents

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

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jay Jay 4",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(course);
}

// Removing
async function removeCourse(id) {
  // takes a filter or query object.
  const result = await Course.deleteOne({
    _id: id,
  });
  // Delete multiple doc
  // .deleteMany
  // Get the deleted doc
  //  const course = await Course.findByIdAndDelete(id);
  // returns null if the given course does not exist.
  console.log(result);
}

removeCourse("65beeb3225f240a11ae95352");
