// 9 - Restructuring the Project

// IN EXPRESS FOLDER
// CREATED: MODELS FOLDER.
// CREATED: CUSTOMERS.JS FILE.

/*
more than 90 lines of code in customers.js just for 
a simple customer model. 
more complex in real world app.

To keep the app maintainable we should ensure that each module is 
responsible for 1 thing.
single responsibility principle

customer.js part of routes of folder.
all it should contain is the definition of the customers route.
definition of customer object doesnt really belong in this module.
extracting and putting it somewhere else.

*/

// index.js

const mongoose = require("mongoose");
const genres = require("./routes/genres-old");
const express = require("express");
const app = express();

const customers = require("./routes/customers");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);

app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
