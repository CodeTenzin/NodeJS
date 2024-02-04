// 8 - Project- Build the Customers API

// build an end point to manage the customers.
// CREATE: CUSTOMERS.JS  IN EXPRESS FOLDER, ROUTES FOLDER

//INDEX.JS
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const app = express();
// load customers module
const customers = require("./routes/customers");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
// added. all route with /api/customers,
// delegate the handling of the route to this customers module.
// index.js not polluted with details of various routes.
// encapsulating the related routes inside modules.
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
