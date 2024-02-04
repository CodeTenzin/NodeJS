// rental.js in model

const Joi = require("joi");
const mongoose = require("mongoose");
//  npm to add support to validate object id in Joi.
// npm i joi-objectid
Joi.ObjectId = require("joi-objectid")(Joi);

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
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
  const schema = {
    // customerId: Joi.string().required(),
    customerId: Joi.ObjectId().required(),
    // movieId: Joi.string().required(),
    movieId: Joi.ObjectId().required(),
  };
  return Joi.validate(rental, schema);
}
// send invalid postman again which will handle the error now.

exports.Rental = Rental;
exports.validate = validateRental;
