const mongoose = require("mongoose");
// Create a Mongoose schema and model
const dataSchema = new mongoose.Schema({
  name: String,
  url: String,
  version: String,
  date: { type: Date, default: Date.now },
});
const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
