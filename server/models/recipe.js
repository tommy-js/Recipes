const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  id: String,
  name: String,
  content: String,
  ingredients: String,
  user: String,
  type: String
});

module.exports = mongoose.model("Recipe", recipeSchema);
