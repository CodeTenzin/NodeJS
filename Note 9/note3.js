// 3 - Population

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  // populate: specify path to given property author, mongo will grab the author from
  // objectId set in the model.
  // const courses = await Course.find().populate("author").select("name author");
  // if we dont want all the properties of author.
  // 2nd param include all the properties to include or exlcude.
  //  exclude _id property.
  //   const courses = await Course.find()
  //     .populate("author", "name -_id")
  //     .select("name author");
  // to populate multiple property
  const courses = await Course.find()
    .populate("author", "name -_id")
    // get name of each category
    .populate("cateory", "name")
    .select("name author");
  console.log(courses);
}

// createAuthor("Jay", "My bio", "My Website");

// createCourse("Node Course", "65bf58941725c5265a4ab4d5");

listCourses();
// author display as:  author: new ObjectId('65bf58941725c5265a4ab4d5')
// using populate to display author.

// mongo does not have relation or data integrity.
// eg: in mongo compass, we manually change an id.
// if we run, author will be null for a query.
