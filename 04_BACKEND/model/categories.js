const mongoose = require("mongoose");
//Schema of Categories

var categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    unique: true,
    lowercase: true,
  },
});

//Export the models
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
