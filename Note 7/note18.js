// 18 - Updating a Document- Update First

/*
Query first approach is useful if we receive an input from client and 
want to make sure tjhat the update is a valid operation.
*/

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

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   // eg: if the course is published, not allow the change of author.
//   // to implement this business rule, need to retreive course first.
//   course.isPublished = true;
//   course.author = "Another Author";
//   const result = await course.save();
//   console.log(result);
// }

// async function updateCourse(id) {
//   // const course = await Course.update({isPublished: false})
//   // can update a doc in db without retreiving it first.
//   // returns a result instead of a course object.
//   const result = await Course.updateMany(
//     { _id: id },
//     {
//       // Google: mongo db update operators documenation.
//       // $set: Sets the value of a field in a document.
//       $set: {
//         author: "Jay Jay",
//         isPublished: false,
//       },
//     }
//   );
//   // not needed
//   // if (!course) return;
//   // course.isPublished = true;
//   // course.author = "Another Author";
//   // const result = await course.save();
//   console.log(result);
// }

// async function updateCourse(id) {
//   // const result = await Course.updateOne(
//   // to get the doc that was updated. returns a course object.
//   const course = await Course.findByIdAndUpdate(id, {
//     $set: {
//       author: "Jay Jay 3",
//       isPublished: true,
//     },
//   });
//   console.log(course);
//   // returns the original doc before the update operation.
//   // author: "Jay Jay 2"
// }

async function updateCourse(id) {
  // to get the updated doc.
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jay Jay 4",
        isPublished: true,
      },
    },
    // pass this property.
    { new: true }
  );
  console.log(course);
}

updateCourse("65beeb3225f240a11ae95352");
// modifiedCount: 1,
