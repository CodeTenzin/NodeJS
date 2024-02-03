const express = require("express");
const router = express.Router();

// app.get("/", (req, res) => {
router.get("/", (req, res) => {
  res.render("index", { title: " My Express App", message: "Hello" });
});

module.exports = router;
