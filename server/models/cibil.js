const mongoose = require("mongoose");

const cibilSchema = new mongoose.Schema({
  pan: String,
  name: String,
  score: Number,
  report: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cibil", cibilSchema);