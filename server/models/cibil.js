const mongoose = require("mongoose");

const cibilSchema = new mongoose.Schema({
  pan: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: Number,
  report: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cibil", cibilSchema);