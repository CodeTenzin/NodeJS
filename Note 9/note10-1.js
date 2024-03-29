// 10 - Validating ObjectIDs

/*
POSTMAN 
POST http://localhost:3000/api/rentals
{
    "customerId": "1234"
     "movieId": "5d342klnf3232e23jkr23e32"
}

npm i joi-objectid   <-- to validate object id in joi.

*/

// rentals.js in routes

const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Fawn = require("fawn");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  // place validation here. check rental.js in models.
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // doesnt ensure the values are valid object id.
  // can use if the body is valid but bad implementation, need to repeat
  // it for the other properties.
  // if (mongoose.Types.ObjectId.isValid(req.body.customerId))
  // return res.status(400).message("Invalid csutomer)");

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

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .remove()

      .run();

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
