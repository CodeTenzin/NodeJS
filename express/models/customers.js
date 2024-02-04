const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(genre, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
