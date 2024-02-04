// 8 - Transactions

/*
in relational db theres a concept of transaciton.
a group of operations that needs to complete together
and if one fails, db needs to rolllback to its initial state.

mongodb dont have transaction.
technique called Two Phase Commit.
Search: MongoDB  Two Phase Commit.

using library that uses the concept of transaction,
but internally uses Two Phase Commit.

Terminal: npm i fawn

COMPASS
delete rentals collections in vidly database

POSTMAN 
GET http://localhost:3000/api/rentals  
{
   " customer_id:": "..."
    "movieId":  "..."
}

compass check compass movies collection. numberInStock has decreased.


in postman id and date properties are also returned which is already set.
id and date defaults values are not set by mondodb.
they are defined in the mongoose schema.
when we create a new retal object, mongoose set the default. 
the properties are set before it is saved in the db. 

Also a new collection is ready in the db that we did not create.
Fawn uses that collecion to use two phase commit.
when we run() a task, it adds a new doc to that collection which
represents our transaciton, then it executes each operations like
save, update, and once these operations are complete, it will
delete that document from that collection.

*/

// rentals.js from express routes folder.

const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// Aded
const Fawn = require("fawn");
Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // no longer creating rental and updating it explicitly.
  // using a trask object. like a transaction.
  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();

  try {
    // all operations passed works like a unit.
    // passing collections, not singular. also case sensitive.
    //
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .remove()
      // none of these operations perform without run.
      .run();

    //send rental object to client.
    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;
