// 7 - Project- Build the Rentals API

/*
Create a new rental
POST /api/rentals

GET the list of rentals
GET /api/rentals
*/

// rental.js in express models

const Joi = require("joi");
const mongoose = require("mongoose");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    // type set to custom schema. not resuisng it.
    // do not want all the properties.
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        // avoid additional query to calculate the rental fee.
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRental(rental) {
  // properties that client sends to the server.
  // other properties are set on the server.
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
