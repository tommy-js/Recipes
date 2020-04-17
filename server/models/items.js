const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: String,
  name: String
});

module.exports = mongoose.model("Item", itemSchema);
