const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

module.exports = mongoose;
