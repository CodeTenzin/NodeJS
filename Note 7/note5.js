// 5 - Schemas

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// schema used to define the shape of doc within a collection in mongodb.
// collection in mongo is like a table in db.
// document in mongo db is like row.

// in relational db, we have tables and rows.
// mongo collections and documents.
// each doc is a container of key value pair

// schema defines what are the properties we have.

const courseSchema = new mongoose.Schema({
  // specify key value pair for doc.
  name: String,
  author: String,
  tags: [String],
  // date: Date,
  // default value
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Schema Types
// Strigs, Number, Date, Buffer, Boolean, ObjectID, Array.
