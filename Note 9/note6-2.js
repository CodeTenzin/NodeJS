// genre.js in express models folder

const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      // avoids longs strings from malicious users.
      maxlength: 255,
    },
    genre: {
      type: genreSchema, // importted from genre model.
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0, // avoids negative number.
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(), // so client can send only the id of the genre.
    // joi schema is what the client sends us. the genre used in mongoose is what's
    // stored in mongodb.
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
