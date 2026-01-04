const mongoose = require("./db");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publishedYear: Number,
  availableCopies: { type: Number, min: 0 }
});

module.exports = mongoose.model("Book", bookSchema);
